const RestaurantGet = {
  id: 2,
  name: 'Koi Palace',
  addressOne: '4288 Dublin Blvd',
  addressTwo: 'suite #213',
  city: 'Dublin',
  state: 'CA',
  zip: '94568',
  email: 'KoiPalace@hotmail.com',
  phone: '9258339090',
  description: 'chinese food, served in morning for dim sum, dinner menu aviable after 5pm',
  genre: 'chinese',
  type: 'dinner',
  paymentId: '23',
  createdAt: '2018-04-21T16:37:34.000Z',
  updatedAt: '2018-04-21T16:37:34.000Z',
  MenuSections: [{
    id: 1,
    name: 'breakfast',
    description: null,
    createdAt: '2018-04-21T16:37:34.000Z',
    updatedAt: '2018-04-21T16:37:34.000Z',
    RestaurantId: 2,
    MenuItems: [{
      id: 1,
      name: 'Siu Mai',
      price: 5.1,
      vegan: false,
      vegetarian: null,
      glutenFree: true,
      spicy: null,
      image: null,
      prepTime: 10,
      rating: 20,
      createdAt: '2018-04-21T16:37:34.000Z',
      updatedAt: '2018-04-21T16:37:34.000Z',
      RestaurantId: 2,
      MenuSectionId: 1,
      status: 'published',
    }],
  }, {
    id: 2,
    name: 'lunch',
    description: 'lunchy munchyyyy',
    createdAt: '2018-04-21T16:37:34.000Z',
    updatedAt: '2018-04-21T16:37:34.000Z',
    RestaurantId: 2,
    MenuItems: [{
      id: 2,
      name: 'Yummy Mai',
      price: 5.1,
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      spicy: null,
      image: null,
      prepTime: 10,
      rating: 5,
      createdAt: '2018-04-21T16:37:34.000Z',
      updatedAt: '2018-04-21T16:37:34.000Z',
      RestaurantId: 2,
      MenuSectionId: 2,
      status: 'published',
    }],
  }, {
    id: 3,
    name: 'brunch',
    description: 'breakfast AND lunch',
    createdAt: '2018-04-21T16:37:34.000Z',
    updatedAt: '2018-04-21T16:37:34.000Z',
    RestaurantId: 2,
    MenuItems: [{
      id: 3,
      name: 'Eggs Benedict Mai',
      price: 15.1,
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      spicy: null,
      image: null,
      prepTime: 10,
      rating: 5,
      createdAt: '2018-04-21T16:37:34.000Z',
      updatedAt: '2018-04-21T16:37:34.000Z',
      RestaurantId: 2,
      MenuSectionId: 3,
      status: 'unavailable',
    },
    {
      id: 4,
      name: 'Waffles Mai',
      price: 10.1,
      vegan: true,
      vegetarian: false,
      glutenFree: false,
      spicy: null,
      image: 'http://images.bigoven.com/image/upload/t_recipe-256/belgian-style-waffles-with-warm-ber.jpg',
      prepTime: 10,
      rating: 5,
      createdAt: '2018-04-21T16:37:34.000Z',
      updatedAt: '2018-04-21T16:37:34.000Z',
      RestaurantId: 2,
      MenuSectionId: 3,
      status: 'published',
    }],
  }],
};

module.exports.sampleRestaurantGet = RestaurantGet;
