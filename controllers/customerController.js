const {
  Customer,
  CustomerRating,
  MenuItem,
  MenuSection,
  Order,
  Restaurant,
  PaymentMethods,
} = require('../database/index.js');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { stripeKey } = require('../config/config.js');
const stripe = require('stripe')(stripeKey);

const customerController = {
  async createCustomer(req, res) {
    const {
      userName,
      firstName,
      lastName,
      password,
      zip,
      phone,
      email,
      availVotes,
      paymentId,
      vendor,
      apiKey,
    } = req.body;

    const user = await Customer.findOne({ where: { email } });
    if (user) {
      res.status(400);
      res.send('email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    Customer.create({
      userName,
      firstName,
      lastName,
      password: hashedPassword,
      zip,
      phone,
      email,
      availVotes: 5,
      paymentId: 1,
      vendor,
      apiKey,
    })
      .then((customer) => {
        // Send back success message to customer.
        res.status(201).json(customer);
        console.log('Customer account created', customer);
        // Create stripe account for customer.
        stripeRegistration(email, `hbCustomerId: ${customer.id}`).then((stripeCustomer) => {
          console.log('Returned from stripe: ', stripeCustomer);
          // Update customer record with Stripe data.
          Customer.update(
            {
              paymentId: stripeCustomer.id,
            },
            {
              where: {
                id: customer.id,
              },
            },
          )
            .then((result) => {
              console.log('successful update of db with stripe data', result);
            })
            .catch((err) => {
              console.log(err);
              res.send(err);
            });
        } );
      })
      .catch((err) => {
        res.send(err);
      });
  },

  getAllRestaurants(req, res) {
    Restaurant.findAll({})
      .then((restaurants) => {
        res.send(restaurants);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  getSingleRestaurant(req, res) {
    const { id } = req.params;
    Restaurant.find({
      where: { id },
      include: [
        {
          model: MenuSection,
          required: false,
          include: [
            {
              model: MenuItem,
              required: false,
            },
          ],
        },
      ],
    })
      .then((restaurant) => {
        if (restaurant === null) {
          res.sendStatus(400);
        } else {
          res.status(200).json(restaurant);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  },

  addPaymentMethod(req, res) {
    const { StripeId, CustomerId, token } = req.body;
    console.log('creating stripe source', StripeId, token, token.token.id);

    stripe.customers.createSource(StripeId, {
      source: token.token.id,
    })

      .then((response) => {
        if (response.error) {
          console.log('Stripe error', response);
          // send back error
          res.status(400).json(response);
        } else {
          // create record in payment methods database.
          console.log('Response from Stripe', response);
          PaymentMethods.create({
            CustomerId,
            cardId: response.id,
            zip: response.address_zip,
            brand: response.brand,
            country: response.address_country,
            exp_month: response.exp_month,
            exp_year: response.exp_year,
            last4: response.last4,
          })
            .then((paymentConfirmation) => {
              // Send back success message to customer.
              res.status(201).json(paymentConfirmation);
            })
            .catch((err) => {
              res.send(err);
            });
        }
      });
  },

  getPaymentMethods(req, res) {
    const { customer_id } = req.params;
    PaymentMethods.findAll({ where: { CustomerId: customer_id } })
      .then((paymentData) => {
        console.log('sending payment data', paymentData);
        // Send back data to customer.
        res.status(201).json(paymentData);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  deletePaymentMethod(req, res) {
    const { payment_id } = req.params;
    PaymentMethods.destroy({ where: { id: payment_id } })
      .then((deleteConfirmation) => {
        // Send back success message to customer.
        res.status(201).json(deleteConfirmation);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  createOrder(req, res) {
    const {
      total,
      table,
      CustomerId,
      StripeId,
      CardId,
      RestaurantId,
      items,
    } = req.body;

    console.log('Processing Stripe charge');
    stripe.charges.create(
      {
        amount: Math.round(total * 100),
        currency: 'usd',
        customer: StripeId,
        source: CardId,
        description: `RestId: ${RestaurantId}, hbCustomerId: ${CustomerId}, items: ${items}`,
      },
      (err, charge) => {
        if (err) {
          console.log('Stripe error', err);
          res.send(err);
        } else {
          console.log('Stripe success', charge);
          Order.create({
            status: 'queued',
            total,
            transactionId: charge.id,
            table,
            CustomerId,
            RestaurantId,
          })
            .then(async (order) => {
              let newOrder = null;
              async function buildOrderItems() {
                items.forEach((item) => {
                  order.addMenuItem(item.id, {
                    through: { special: item.special, price: item.price },
                  });

                  CustomerRating.findOrCreate({
                    where: {
                      CustomerId: customer_id,
                      MenuItemId: menu_item_id,
                    },
                  })
                    .spread((rating, created) => rating.increment('total'))
                    .catch((err) => {
                      console.log(error);
                    });
                });
                newOrder = Order.findById(order.id, {
                  include: [MenuItem],
                  required: false,
                });
              }

              await buildOrderItems();

              return newOrder;
            })
            .then((order) => {
              res.json(order);
            })
            .catch((error) => {
              res.send(error);
              console.log(error);
            });
        }
      },
    );

  },

  incrementRating(req, res) {
    const { customer_id, menu_item_id } = req.params;

    CustomerRating.findOrCreate({
      where: {
        CustomerId: customer_id,
        MenuItemId: menu_item_id,
      },
    })
      .spread((rating, created) => rating.increment('total'))
      .then((rating) => {
        this._getRatingsForCustomer(customer_id, res);
      })
      .catch((err) => {
        res.send(err);
      });

    MenuItem.findById(menu_item_id).then((menuItem) => {
      menuItem.increment('rating');
    });
  },

  _getRatingsForCustomer(customerId, res) {
    Customer.findOne({
      where: {
        id: customerId,
      },
      attributes: ['userName', 'id'],
      include: [
        {
          model: MenuItem,
          required: false,
          attributes: ['name', 'image', 'id'],
          include: [
            {
              model: Restaurant,
              required: false,
              attributes: ['name'],
            },
          ],
        },
      ],
    })
      .then((info) => {
        const data = {
          userId: info.id,
          rated: [],
          unrated: [],
        };

        info.MenuItems.forEach((item) => {
          const entry = {
            name: item.name,
            itemId: item.id,
            restaurant: item.Restaurant.name,
            likes: null,
            image: item.image,
          };

          if (item.CustomerRating && item.CustomerRating.total > 0) {
            entry.likes = item.CustomerRating.total;
            data.rated.push(entry);
          } else {
            data.unrated.push(entry);
          }
        });

        data.rated.sort((a, b) => {
          if (a.likes > b.likes) {
            return -1;
          }
          if (a.likes < b.likes) {
            return 1;
          }

          return 0;
        });

        return data;
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  getAllCustomers(req, res) {
    Customer.findAll({ include: [{ model: MenuItem }] })
      .then((customers) => {
        res.send(customers);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  getSingleCustomer(req, res) {
    const { customer_id } = req.params;

    Customer.findOne({
      where: {
        id: customer_id,
      },
      include: [
        {
          model: MenuItem,
          required: false,
        },
      ],
    })
      .then((customer) => {
        if (customer === null) {
          res.sendStatus(400);
        } else {
          res.status(200).json(customer);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  },

  getAllOrdersForCustomer(req, res) {
    const { customer_id } = req.params;
    console.log('Customer Id for order request', customer_id);

    Order.findAll({
      where: {
        CustomerId: customer_id,
      },
      include: [
        {
          model: Restaurant,
          attributes: ['name'],
        },
        {
          model: MenuItem,
          required: false,
        },
      ],
    })
      .then((orders) => {
        console.log('Orders coming');
        res.json(orders);
      })
      .catch((err) => {
        console.log('Orders error');
        res.send(err);
      });
  },

  getAllOrdersForCustomers(req, res) {
    Order.findAll()
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  getRatingsForCustomer(req, res) {
    const { customer_id } = req.params;
    this._getRatingsForCustomer(customer_id, res);
  },

  updateCustomer(req, res) {
    const { customer_id } = req.params;
    const {
      firstName, lastName, zip, phone, email,
    } = req.body;

    Customer.update(
      {
        firstName,
        lastName,
        zip,
        phone,
        email,
      },
      {
        where: {
          id: customer_id,
        },
      },
    )
      .then((customer) => {
        res.json(customer);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  },

  async loginCustomer(req, res) {
    const { email, password } = req.body;
    console.log('login email', email, 'login password', password);
    const user = await Customer.findOne({
      where: { email },
      include: [{ model: PaymentMethods, required: false }],
    });
    if (!user) {
      console.log('no user');
      res.sendStatus(400);
    }

    const authorized = await bcrypt.compare(password, user.password);
    if (!authorized) {
      console.log('not authorized');
      res.sendStatus(400);
    }

    const token = jwt.sign({ id: user.id, userType: 'Customer' }, 'secret', {
      expiresIn: 129600,
    });
    const info = {
      token,
      userId: user.id,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      votes: user.availVotes,
      paymentId: user.paymentId,
      paymentMethods: user.PaymentMethods,

    };
    res.json(info);
  },

  deleteCustomer(req, res) {
    const { customer_id } = req.params;

    Customer.destroy({
      where: { id: customer_id },
    })
      .then((deleted) => {
        if (deleted < 1) {
          res.sendStatus(400);
        } else {
          res.sendStatus(200);
        }
      })
      .catch((err) => {
        console.log('err', err);
        res.send(err);
      });
  },

  async updateCustomerProfile(req, res) {
    const { customer_id } = req.params;
    const {
      userName,
      firstName,
      lastName,
      password,
      email,
      originalEmail,
      phone,

    } = req.body;
    if (originalEmail !== email) {
      const existingEmail = await Customer.findOne({ where: { email } });
      if (existingEmail) {
        res.sendStatus(400);
      }
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Customer.update(
        { password: hashedPassword },
        { where: { id: customer_id } },
      );
    }

    Customer.update({
      userName,
      firstName,
      lastName,
      email,
      phone,
    }, {
      where: { id: customer_id },
      returning: true,
      plain: true,
    })
      .then(async () => {
        const updatedUser = await Customer.findOne({ where: { id: customer_id } });
        res.json(updatedUser);
      });
  },
};

module.exports = customerController;
