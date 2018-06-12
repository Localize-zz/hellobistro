const sequelize = require('sequelize');
const moment = require('moment');
const fetch = require('node-fetch');
// authentication
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// image processing and upload
const AWS = require('aws-sdk');
const UUID = require('uuid/v4');
const Busboy = require('busboy');
const { photos, googleApiKey } = require('../config/config.js');
const analyticsController = require('../controllers/analyticsController');

AWS.config.update({ accessKeyId: photos.accessKeyId, secretAccessKey: photos.secretAccessKey });
const S3 = new AWS.S3();
// sequelize models

const {
  Customer,
  Restaurant,
  RestaurantUser,
  MenuSection,
  MenuItem,
  Order,
  OrderItem,
} = require('../database/index.js');

const _ = require('lodash');

const restaurantController = {
  async createRestaurant(req, res) {
    let newRestaurant = null;

    const {
      name,
      addressOne,
      addressTwo,
      addressCity,
      addressState,
      addressZip,
      email,
      phone,
      description,
      genre,
      type,
      paymentId,
      password,
    } = req.body;

    const possibleUser = await RestaurantUser.findOne({ where: { email } });

    if (possibleUser) {
      return res.status(400).json({ error: 'Email already exist.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let lat;
    let lng;
    const addyTwo = `${addressCity} ${addressState} ${addressZip}`;
    const url = `http://www.yaddress.net/api/Address?AddressLine1=${addressOne}&AddressLine2=${addyTwo}&UserKey=`;
    const apple = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(result => result.json())
      .then((data) => {
        if (data.ErrorCode !== 0) {
          return res.status(400).json({ error: data.ErrorMessage });
        }
        lat = data.Latitude;
        lng = data.Longitude;
      });

    if (apple !== undefined) {
      return;
    }

    Restaurant.create({
      name,
      addressOne,
      addressTwo,
      city: addressCity,
      state: addressState,
      zip: addressZip,
      email,
      phone,
      description,
      genre,
      type,
      paymentId,
      latitude: lat,
      longitude: lng,
    })
      .then((restaurant) => {
        newRestaurant = restaurant;
        return RestaurantUser.create({
          RestaurantId: restaurant.id,
          email,
          password: hashedPassword,
          phone,
        });
      })
      .then((user) => {
        res.status(201).json({
          user: user.id,
          restaurant: newRestaurant,
        });
      })
      .catch((err) => {
        console.log(err);
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

  getAllOrdersForRestaurant(req, res) {
    const { restaurant_id } = req.params;
    Order.findAll({
      where: {
        RestaurantId: restaurant_id,
      },
      include: [
        {
          model: MenuItem,
          required: false,
        },
        {
          model: Customer,
          required: false,
        },
      ],
    })
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  getOpenRestaurantOrders(RestaurantId) {
    return Order.findAll({
      where: {
        RestaurantId,
        completedAt: null,
      },
      include: [
        {
          model: MenuItem,
          required: false,
        },
      ],
    });
  },

  createMenuSection(req, res) {
    const { restaurant_id } = req.params;
    const { name, description } = req.body;
    MenuSection.create({
      name,
      description,
      RestaurantId: restaurant_id,
    })
      .then((item) => {
        res.json(item);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  async createMenuItem(req, res) {
    const { restaurant_id } = req.params;
    const {
      name,
      // description,
      price,
      vegan,
      vegetarian,
      glutenFree,
      spicy,
      image,
      prepTime,
      rating,
      status,
      menuSectionId,
    } = req.body;

    MenuItem.create({
      name,
      price,
      vegan,
      vegetarian,
      glutenFree,
      spicy,
      image,
      prepTime,
      rating,
      status,
      MenuSectionId: menuSectionId,
      RestaurantId: restaurant_id,
    })
      .then((item) => {
        res.json(item);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  updateMenuItem(req, res) {
    const { restaurant_id, item_id } = req.params;
    const {
      name,
      status,
      price,
      vegan,
      vegetarian,
      glutenFree,
      spicy,
      image,
      prepTime,
      rating,
      description,
      MenuSectionId,
    } = req.body;
    if (status === 'archived' && typeof JSON.parse(item_id) !== 'number') {
      return res.sendStatus(200);
    }

    MenuItem.upsert({
      id: item_id,
      name,
      status,
      price,
      vegan,
      vegetarian,
      glutenFree,
      spicy,
      image,
      prepTime,
      rating,
      description,
      MenuSectionId,
      RestaurantId: restaurant_id,
    })
      .then(() => {
        MenuItem.findOne({ where: { name, MenuSectionId, RestaurantId: restaurant_id } }).then((item) => {
          console.log('the found item is: ', item)
          res.json({item})
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },

  updateMenuSection(req, res) {
    const { restaurant_id, section_id } = req.params;
    const {
      name,
      description,
    } = req.body;
  
    MenuSection.upsert({
      id: section_id,
      name,
      description,
      RestaurantId: restaurant_id,
    })
      .then(() => {
        MenuSection.findOne({ where: { name, RestaurantId: restaurant_id } }).then((section) => {
          res.json({section})
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },

  deleteMenuSection(req, res) {
    const { section_id } = req.params;
    MenuSection.destroy({
      where: { id: section_id },
    })
      .then((deleted) => {
        if (deleted < 1) {
          res.sendStatus(400);
        } else {
          res.status(200).json(deleted);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  },

  getAllRatingsForRestaurant(req, res) {
    const { restaurant_id } = req.params;
    Order.findAll({
      where: {
        RestaurantId: restaurant_id,
      },
      include: [
        {
          model: MenuItem,
          required: false,
        },
      ],
    })
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  async updateRestaurant(req, res) {
    const { restaurant_id } = req.params;
    const updatedValues = req.body.formValues;
    const data = req.body.info;
    const {
      addressOne, city, state, zip,
    } = _.assign({}, data, updatedValues);
    let lat;
    let lng;
    const addyTwo = `${city} ${state} ${zip}`;
    const url = `http://www.yaddress.net/api/Address?AddressLine1=${addressOne}&AddressLine2=${addyTwo}&UserKey=`;
    const apple = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(result => result.json())
      .then((data) => {
        if (data.ErrorCode !== 0) {
          return res.status(400).json({ error: data.ErrorMessage });
        }
        lat = data.Latitude;
        lng = data.Longitude;
      });

    if (apple !== undefined) {
      return;
    }
    
    Restaurant.findOne({ where: { id: restaurant_id }, include: [{ model: RestaurantUser, required: false }] })
      .then(async (restaurant) => {
        const user = restaurant.RestaurantUsers[0];
        let hashedPassword = null;
        if (updatedValues.password) {
          hashedPassword = await bcrypt.hash(updatedValues.password, 10);
          updatedValues.password = hashedPassword;
        }

        if (updatedValues.password && updatedValues.email) {
          await user.update({
            email: updatedValues.email,
            password: updatedValues.password,
          });
        } else if (updatedValues.password) {
          await user.update({
            password: updatedValues.password,
          });
        } else if (updatedValues.email) {
          await user.update({
            email: updatedValues.email,
          });
        }
        updatedValues.latitude = lat;
        updatedValues.longitude = lng;
        return restaurant.update(updatedValues);
      })
      .then((updatedRestaurant) => {
        res.json(updatedRestaurant);
      })
      .catch((err) => {
        console.log(err);
        res.json({
          message: 'An error was encountered updating the restaurant',
        });
      });
  },

  async loginRestaurant(req, res) {
    const { email, password } = req.body;
    const user = await RestaurantUser.findOne({ where: { email } });
    if (!user) {
      res.sendStatus(400);
    }
    const authorized = await bcrypt.compare(password, user.password);
    if (!authorized) {
      res.sendStatus(400);
    }
    const restaurantInfo = await Restaurant.findOne({
      where: { id: user.RestaurantId },
    });
    const token = jwt.sign({ userType: 'Restaurant', id: user.RestaurantId }, 'secret', {
      expiresIn: 129600,
    });
    const info = {
      token,
      userId: user.id,
      userType: 'Restaurant',
      userName: user.userName,
      restaurantInfo,
    };

    analyticsController.poke();
    res.json(info);
  },

  deleteRestaurant(req, res) {
    const { restaurant_id } = req.params;

    Restaurant.destroy({
      where: { id: restaurant_id },
    })
      .then((deleted) => {
        if (deleted < 1) {
          res.sendStatus(400);
        } else {
          res.sendStatus(200);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  },

  deleteOrder(req, res) {
    const { restaurant_id, order_id } = req.params;

    Order.destroy({
      where: {
        id: order_id,
        RestaurantId: restaurant_id,
      },
    })
      .then((deleted) => {
        if (deleted < 1) {
          res.sendStatus(400);
        } else {
          res.sendStatus(200);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  },

  closeOrder(OrderId) {
    return Order.update(
      {
        status: 'completed',
        completedAt: moment(),
      },
      {
        where: { id: OrderId },
      },
    );
  },

  fetchUserDataForWidget(req, res) {
    const { CustomerId, RestaurantId } = req.params;
    Order.findAll({ where: { RestaurantId, CustomerId }, include: [{ model: MenuItem, required: false }] })
      .then((orders) => {
        const formatted = orders.map(order => ({ id: order.id, createdAt: moment(order.createdAt).format('ddd, MMMM D, YYYY'), total: order.total }));
        res.json(formatted);
      })
      .catch((err) => { console.log(err); res.send(err); });
  },

  uploadPhoto(req, res) {
    const { item_id } = req.params;
    let chunks = [],
      fname,
      ftype,
      fEncoding;
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      fname = filename.replace(/ /g, '_');
      ftype = mimetype;
      fEncoding = encoding;
      file.on('data', (data) => {
        // you will get chunks here will pull all chunk to an array and later concat it.
        chunks.push(data);
      });
      file.on('end', () => {
        console.log(`File [${filename}] Finished`);
      });
    });
    busboy.on('finish', () => {
      const userId = UUID();
      const params = {
        Bucket: 'hbphotostorage',
        Key: `${userId}-${fname}`,
        Body: Buffer.concat(chunks), // concatinating all chunks
        ACL: 'public-read',
        ContentEncoding: fEncoding, // optional
        ContentType: ftype, // required
      };
      // we are sending buffer data to s3.
      S3.upload(params, (err, s3res) => {
        if (err) {
          res.send({ err, status: 'error' });
        } else {
          res.send({ data: s3res, status: 'success', msg: 'Image successfully uploaded.' });
        }
      });
    });
    req.pipe(busboy);
  },

  deletePhoto(req, res) {
    const { imageKey } = req.body;
    const params = { Bucket: 'hbphotostorage', Key: imageKey };
    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        res.status(400).json(err);
      } else {
        console.log('successfully deleted photo');
        res.status(200).json(data);
      }
    });
  },

  closestRestaurants(req, res) {
    const { lat, lng } = req.params;

    Restaurant.findAll({
      attributes: [[sequelize.literal(`6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(${lng}) - radians(longitude)) + sin(radians(${lat})) * sin(radians(latitude)))`), 'distance'],
        'id', 'name', 'genre', 'type', 'addressOne', 'addressTwo', 'city', 'state', 'phone', 'description'],
      order: sequelize.col('distance'),
      limit: 8,
    }).then((result) => {
      res.json(result);
    }).catch((err) => {
      res.send(err);
    });
  },

  getCoordinates(req, res) {
    const { restaurant_id } = req.params;
    Restaurant.findAll({
      where: {
        id: restaurant_id,
      },
    }).then((info) => {
      res.json(info);
    });
  },

};

module.exports = restaurantController;
