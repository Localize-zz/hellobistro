const { photos, googleApiKey } = require('../config/config.js');
const {
  Customer,
  Restaurant,
  RestaurantUser,
  MenuSection,
  MenuItem,
  Order,
  OrderItem,
} = require('../database/index.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// upload photo
const AWS = require('aws-sdk');
const UUID = require('uuid/v4');
const Busboy = require('busboy');

AWS.config.update({ accessKeyId: photos.accessKeyId, secretAccessKey: photos.secretAccessKey });
const S3 = new AWS.S3();

const moment = require('moment');

const fetch = require("node-fetch");

const sequelize = require('sequelize');

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
      res.status(400);
      res.send('email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let lat;
    let lng;
    await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=
          ${addressOne},${addressCity},${addressState}&key=${googleApiKey}`)
      .then((res) => res.json())
        .then((res) => {
          lat = res.results[0].geometry.location.lat
          lng = res.results[0].geometry.location.lng
        })
        .catch(err => {
          console.log('error getting lat & lng', err)
        })

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
        console.log('the new restaurant: ', restaurant)
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

  getAllOpenOrdersForRestaurant(req, res) {
    const { restaurant_id } = req.params;

    Order.findAll({
      where: {
        RestaurantId: restaurant_id,
        completedAt: null,
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

  createNewOrder(req, res) {
    const { restaurant_id } = req.params;
    const {
      status, total, completedAt, transactionId, table,
    } = req.body;

    Order.create({
      status,
      total,
      completedAt,
      transactionId,
      table,
      RestaurantId: restaurant_id,
    })
      .then((order) => {
        res.json(order);
      })
      .catch((err) => {
        res.send(err);
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
      MenuSectionId,
      RestaurantId: restaurant_id,
    })
      .then((item) => {
        res.json(item);
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
      .then((item) => {
        res.json(item);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  deleteMenuSection(req, res) {
    const { section_id } = req.params;
    MenuSection.destroy({
      where: { id: section_id }
    })
      .then(deleted => {
        if (deleted < 1) {
          res.sendStatus(400);
        } else {
          res.status(200).json(deleted);
        }
      })
      .catch(err => {
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
    const updatedValues = req.body;

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
    const restaurantInfo = await Restaurant.findOne({
      where: { id: user.RestaurantId },
    });
    if (!user) {
      res.sendStatus(400);
    }

    const authorized = await bcrypt.compare(password, user.password);
    if (!authorized) {
      res.sendStatus(400);
    }

    const token = jwt.sign({ userType: 'Restaurant' }, 'secret', {
      expiresIn: 129600,
    });
    const info = {
      token,
      userId: user.id,
      userName: user.userName,
      restaurantInfo,
    };
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

  completeOpenOrder(req, res) {
    const { order_id } = req.params;
    Order.update(
      {
        status: 'completed',
        completedAt: moment(),
      },
      {
        where: { id: order_id },
      },
    ).then((res) => {
      res.json(res);
    }).catch((err) => {
      res.send(err);
    });
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
    var params = { Bucket: 'hbphotostorage', Key: imageKey };
    S3.deleteObject(params, function(err, data) {
      if (err) {
        console.log(err, err.stack) 
        res.status(400).json(err);
      } else {
        console.log('successfully deleted photo');
        res.status(200).json(data);
      }                     
    });
  },

  async closestRestaurants(req, res){
    //let { lat, lng } = req.params
    let lat = 37.7862199
    let lng = -122.20992

    // const location = sequelize.literal(`ST_GeomFromText('POINT(${ lng } ${ lat })')`)
    // const locationB = sequelize.literal(`ST_GeomFromText('POINT(37.7239446 -122.1540415)')`)
    // const distance = sequelize.fn('ST_Distance_Sphere', locationB, location)
    // // console.log('the sequelize.col(location):  ', sequelize.col('location'))
    // console.log('the distance is: ', distance)
    // Restaurant.findAll({
    // order: distance,
    // where: sequelize.where(distance,  '<= 10000' ),
    // logging: console.log
    // }).then(result => {
    //   console.log('the closest restaurants list: ', result)
    //   res.json(result)
    // })

    Restaurant.findAll({
      attributes: [[sequelize.literal("6371 * acos(cos(radians("+lat+")) * cos(radians(latitude)) * cos(radians("+lng+") - radians(longitude)) + sin(radians("+lat+")) * sin(radians(latitude)))"),'distance'], 
      'id', 'name', 'genre', 'type', 'addressOne', 'addressTwo', 'city', 'state', 'phone'],
      order: sequelize.col('distance'),
      limit: 3,
    }).then(result => {
      res.json(result)
    }).catch(err => {
      res.send(err)
    });

    // lat = parseFloat(lat);
    // lng = parseFloat(lng);
    // var attributes = Object.keys(Restaurant.attributes);
    // var location = sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`);
    // var distance = sequelize.fn('ST_Distance_Sphere', sequelize.col('location'), location);
    // //attributes.push([distance,'distance']);

    // Restaurant.findAll({
    //   attributes: [[sequelize.literal("6371 * acos(cos(radians("+lat+")) * cos(radians(latitude)) * cos(radians("+lng+") - radians(longitude)) + sin(radians("+lat+")) * sin(radians(latitude)))"),'distance']],
    //   order: sequelize.col('distance'),
    //   where: sequelize.where(distance, '<= 10000'),
    //   logging: console.log
    // })
    // .then(function(instance){
    //   return res.json(200, instance);
    // })

    
    // const location = sequelize.literal(`ST_GeomFromText('POINT(${lat} ${lng})', 4326)`);
    // var distance = sequelize.fn('ST_Distance_Sphere', sequelize.literal('location'), location);

    // Restaurant.findAll({
    //   attributes: [[sequelize.literal("6371 * acos(cos(radians("+lat+")) * cos(radians(latitude)) * cos(radians("+lng+") - radians(longitude)) + sin(radians("+lat+")) * sin(radians(latitude)))"),'distance']],      order: distance,
    //   limit: 2,
    // })
    // .then((instance) => {
    //   console.log('the restaurant list in controller: ', instance);
    //   res.json(instance)
    // })


    // const location = sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})')`)
    // const distance = sequelize.fn('ST_Distance_Sphere', sequelize.col('location'), location)

    // console.log('the location in controller:  ', location)
    // console.log('the distance in controller:  ', distance)

    // Restaurant.findAll({
    //   // attribute: ["*", [sequelize.fn("ST_Distance_Sphere", sequelize.fn("ST_MakePoint", lat, lng), sequelize.col("location")), "distance"]],
    //   order: distance,
    //   // where: sequelize.where(distance, { $lte: '10000' }),
    //   where: sequelize.where(distance, "<= 10000"),
    //   logging: console.log
    // }).then((result) => {
    //   console.log('the result: ', result)
    //   res.json(result)
    // }).catch(err => {
    //   console.log('the error~~:   ', err)
    //   res.send(err)
    // })
  },

  getCoordinates(req, res){
    const { restaurant_id } = req.params;
    Restaurant.findAll({
      where: {
        id: restaurant_id
      }
    }).then((info) => {
      res.json(info)
    })
  }

};

module.exports = restaurantController;
