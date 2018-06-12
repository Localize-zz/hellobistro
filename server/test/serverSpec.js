const { describe, it, before } = require('mocha');
const chai = require('chai');
const { assert, expect } = chai;
const chaiHttp = require('chai-http');
const server = require('../app');

const { sampleRestaurants, sampleCustomers } = require('../../sampleData');

let postedRestaurant = null;

chai.use(chaiHttp);

// NOTE:
// (1) Please make sure the HelloBistro server is running
// before running the following tests
// (2) These tests are based upon the static example data populating
// the database and should eventually be refactored to be dynamic

describe('GET to /restaurants', () => {
  let response = null;

  before(function (done) {
    this.timeout(20000);
    chai.request(server)
      .get('/restaurants')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          response = res;
        }
        done();
      });
  });
  
  it('should return a response with a 200 status code', (done) => {
    expect(response.status).to.equal(200);
    done();
  });

  it('should return an array of objects', (done) => {
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.be.an('object');
    done();
  });

  it('the returned array should contain all restaurants in the database', (done) => {
    expect(response.body[0].name).to.equal(sampleRestaurants[0].name);
    expect(response.body[1].name).to.equal(sampleRestaurants[1].name);
    expect(response.body[2].name).to.equal(sampleRestaurants[2].name);
    expect(response.body[3].name).to.equal(sampleRestaurants[3].name);  
    done();
  });
}).timeout(20000);

describe('GET to /customers', () => {
  let response = null;

  before(function (done) {
    this.timeout(20000);
    chai.request(server)
      .get('/customers')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          response = res;
        }
        done();
      });
  });
  
  it('should return a response with a 200 status code', (done) => {
    expect(response.status).to.equal(200);
    done();
  });

  it('should return an array of objects', (done) => {
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.be.an('object');
    done();
  });

  it('the returned array should contain all customers in the database', (done) => {
    expect(response.body[0].firstName).to.equal(sampleCustomers[0].firstName);
    expect(response.body[1].firstName).to.equal(sampleCustomers[1].firstName);
    expect(response.body[2].firstName).to.equal(sampleCustomers[2].firstName);
    expect(response.body[3].firstName).to.equal(sampleCustomers[3].firstName);  
    expect(response.body[4].firstName).to.equal(sampleCustomers[4].firstName);  
    done();
  });
}).timeout(20000);

describe('POST and DELETE to /restaurants', () => {
  let responseToPost = null;
  let responseToGet = null;
  let responseToDelete = null;
  let responseToGetDeleted = null;

  const newRestaurant = {
    name: 'Fake Restaurant 111',
    email: 'cloud111@polarbrrr.com',
    phone: '415 990 1xxx',
    addressOne: '1234 Fake Street',
    addressTwo: 'Ste 743',
    city: 'New York',
    state: 'NY',
    zip: '10011',
    description: 'freegan, vegan, hipster',
    genre: 'vegan',
    type: 'bar',
    paymentId: '111',
  };

  before(function (done) {
    this.timeout(20000);
    chai.request(server)
      .post('/restaurants')
      .send(newRestaurant)
      .then((res) => {
        responseToPost = res;
        return chai.request(server).get(`/restaurants/${responseToPost.body.id}`);
      })
      .then((res) => {
        responseToGet = res;
        return chai.request(server).delete(`/restaurants/${responseToGet.body.id}`);
      })
      .then((res) => {
        responseToDelete = res;
      })
      .then(() => {
        return chai.request(server).get(`/restaurants/${responseToGet.body.id}`);
      })
      .then((res) => {
        responseToGetDeleted = res;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  describe('POST to /restaurants', () => {
    it('should return a response with a 201 status code', (done) => {
      expect(responseToPost.status).to.equal(201);
      done();
    });
  
    it('should return the newly-created restaurant and save it in the database', (done) => {
      expect(responseToPost.body).to.be.an('object');
      expect(responseToPost.body.name).to.equal('Fake Restaurant 111');
      expect(responseToPost.body.id).to.equal(responseToGet.body.id);
      expect(responseToPost.body.name).to.equal(responseToGet.body.name);
      done();
    });
  });

  describe('DELETE to /restaurants/:id', () => {
    it('should return a response with a 200 status code', (done) => {
      expect(responseToDelete.status).to.equal(200);
      done();
    });
  
    it('should remove the deleted item from the database', (done) => {
      expect(responseToGetDeleted.status).to.equal(400);
      done();
    });

  });
  

}).timeout(20000);

describe('POST and DELETE to /customers', () => {
  let responseToPost = null;
  let responseToGet = null;
  let responseToDelete = null;
  let responseToGetDeleted = null;

  const newCustomer = {
    userName: 'fluffydawg',
    firstName: 'Loofie',
    lastName: 'Dog',
    password: '123',
    zip: null,
    phone: null,
    email: 'fluffynfriendly@polarbrrr.com',
    availVotes: 0,
    paymentId: 1,
    vendor: null,
    apiKey: null,
  };

  before(function (done) {
    this.timeout(20000);
    chai.request(server)
      .post('/customers')
      .send(newCustomer)
      .then((res) => {
        responseToPost = res;
        return chai.request(server).get(`/customers/${responseToPost.body.id}`);
      })
      .then((res) => {
        responseToGet = res;
        return chai.request(server).delete(`/customers/${responseToGet.body.id}`);
      })
      .then((res) => {
        responseToDelete = res;
      })
      .then(() => {
        return chai.request(server).get(`/customers/${responseToGet.body.id}`);
      })
      .then((res) => {
        responseToGetDeleted = res;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  describe('POST to /customers', () => {
    it('should return a response with a 201 status code', (done) => {
      expect(responseToPost.status).to.equal(201);
      done();
    });
  
    it('should return the newly-created customer and save it in the database', (done) => {
      expect(responseToPost.body).to.be.an('object');
      expect(responseToPost.body.userName).to.equal('fluffydawg');
      expect(responseToPost.body.id).to.equal(responseToGet.body.id);
      expect(responseToPost.body.name).to.equal(responseToGet.body.name);
      done();
    });
  });

  describe('DELETE to /customers/:id', () => {
    it('should return a response with a 200 status code', (done) => {
      expect(responseToDelete.status).to.equal(200);
      done();
    });
  
    it('should remove the deleted item from the database', (done) => {
      expect(responseToGetDeleted.status).to.equal(400);
      done();
    });

  });
  

}).timeout(20000);

describe('POST and DELETE to /customers/:id/orders', () => {
  let responseToPost = null;
  let responseToGet = null;
  let responseToDelete = null;
  let responseToGetDeleted = null;

  const newCustomer = {
    userName: 'fluffydawg',
    firstName: 'Loofie',
    lastName: 'Dog',
    password: '123',
    zip: null,
    phone: null,
    email: 'fluffynfriendly@polarbrrr.com',
    availVotes: 0,
    paymentId: 1,
    vendor: null,
    apiKey: null,
  };

  before(function (done) {
    this.timeout(20000);
    chai.request(server)
      .post('/customers')
      .send(newCustomer)
      .then((res) => {
        responseToPost = res;
        return chai.request(server).get(`/customers/${responseToPost.body.id}`);
      })
      .then((res) => {
        responseToGet = res;
        return chai.request(server).delete(`/customers/${responseToGet.body.id}`);
      })
      .then((res) => {
        responseToDelete = res;
      })
      .then(() => {
        return chai.request(server).get(`/customers/${responseToGet.body.id}`);
      })
      .then((res) => {
        responseToGetDeleted = res;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  describe('POST to /customers', () => {
    it('should return a response with a 201 status code', (done) => {
      expect(responseToPost.status).to.equal(201);
      done();
    });
  
    it('should return the newly-created customer and save it in the database', (done) => {
      expect(responseToPost.body).to.be.an('object');
      expect(responseToPost.body.userName).to.equal('fluffydawg');
      expect(responseToPost.body.id).to.equal(responseToGet.body.id);
      expect(responseToPost.body.name).to.equal(responseToGet.body.name);
      done();
    });
  });

  describe('DELETE to /customers/:id', () => {
    it('should return a response with a 200 status code', (done) => {
      expect(responseToDelete.status).to.equal(200);
      done();
    });
  
    it('should remove the deleted item from the database', (done) => {
      expect(responseToGetDeleted.status).to.equal(400);
      done();
    });

  });
  

}).timeout(20000);