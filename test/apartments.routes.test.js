'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex.js');
const server = require('../index.js');
const { addDatabaseHooks } = require('./utils.js')
suite('apartments routes', addDatabaseHooks(() => {
  test('GET /apartments', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/apartments')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
        apartmentId: 1,
        apartmentName: 'home',
        street: 'fsdafa',
        city: 'SF',
        state: 'CA',
        country: 'USA',
        zip: '1321',
        latitude: '32132',
        longitude: '3213',
        landlordId: 1,
        sqrFootage: 12321,
        bedrooms: 3213,
        bathrooms:986546,
        beds: 32132,
        apartmentDescription: 'great place to live',
        aptUrl: 'something.com',
        createdAt: '2017-05-14T12:23:00.000Z',
        updatedAt: '2017-05-14T12:23:00.000Z',
      },
      {
      apartmentId: 2,
      apartmentName: 'home',
      street: 'fsdafa',
      city: 'SF',
      state: 'CA',
      country: 'USA',
      zip: '1321',
      latitude: '32132',
      longitude: '3213',
      landlordId: 2,
      sqrFootage: 12321,
      bedrooms: 3213,
      bathrooms:986546,
      beds: 32132,
      apartmentDescription: 'great place to live',
      aptUrl: 'something.com',
      createdAt: '2017-05-14T12:23:00.000Z',
      updatedAt: '2017-05-14T12:23:00.000Z',
    },
    {
    apartmentId: 3,
    apartmentName: 'home',
    street: 'fsdafa',
    city: 'SF',
    state: 'CA',
    country: 'USA',
    zip: '1321',
    latitude: '32132',
    longitude: '3213',
    landlordId: 1,
    sqrFootage: 12321,
    bedrooms: 3213,
    bathrooms:986546,
    beds: 32132,
    apartmentDescription: 'great place to live',
    aptUrl: 'something.com',
    createdAt: '2017-05-14T12:23:00.000Z',
    updatedAt: '2017-05-14T12:23:00.000Z',
  }
      ], done);
    /* eslint-enable max-len */
  });

  test('GET /apartments/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/apartments/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
      apartmentId: 1,
      apartmentName: 'home',
      street: 'fsdafa',
      city: 'SF',
      state: 'CA',
      country: 'USA',
      zip: '1321',
      latitude: '32132',
      longitude: '3213',
      landlordId: 1,
      sqrFootage: 12321,
      bedrooms: 3213,
      bathrooms:986546,
      beds: 32132,
      apartmentDescription: 'great place to live',
      aptUrl: 'something.com',
      createdAt: '2017-05-14T12:23:00.000Z',
      updatedAt: '2017-05-14T12:23:00.000Z',
    }, done);
  });
  test('POST /apartments', (done) => {
    request(server)
      .post('/apartments')
      .set('Accept', 'application/json')
      .send({
      apartment_id: 4,
      apartment_name: 'name',
      street: 'street',
      city: 'SF',
      state: 'CA',
      country: 'USA',
      zip: '13212',
      latitude: '321322',
      longitude: '32132',
      landlord_id: 1,
      sqr_footage: 123211,
      bedrooms: 32132,
      bathrooms:9865464,
      beds: 321321,
      apartment_description: 'awesome',
      apt_url: 'something.com',
      created_at: new Date('2017-05-14 12:23:00 UTC'),
      updated_at: new Date('2017-05-14 12:23:00 UTC'),
    })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, {
    apartmentId: 4,
    apartmentName: 'name',
    street: 'street',
    city: 'SF',
    state: 'CA',
    country: 'USA',
    zip: '13212',
    latitude: '321322',
    longitude: '32132',
    landlordId: 1,
    sqrFootage: 123211,
    bedrooms: 32132,
    bathrooms:9865464,
    beds: 321321,
    apartmentDescription: 'awesome',
    aptUrl: 'something.com',
  }, done);
      /* eslint-enable max-len */
  });

  test('DELETE /apartments/:id', (done) => {
    request(server)
      .del('/apartments/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
      apartmentId: 1,
      apartmentName: 'home',
      street: 'fsdafa',
      city: 'SF',
      state: 'CA',
      country: 'USA',
      zip: '1321',
      latitude: '32132',
      longitude: '3213',
      landlordId: 1,
      sqrFootage: 12321,
      bedrooms: 3213,
      bathrooms:986546,
      beds: 32132,
      apartmentDescription: 'great place to live',
      aptUrl: 'something.com',
      createdAt: '2017-05-14T12:23:00.000Z',
      updatedAt: '2017-05-14T12:23:00.000Z',
    }], done);
  });
  //
  // test('GET /coffee/:id that doesn\'t exist', (done) => {
  //   /* eslint-disable max-len */
  //   request(server)
  //     .get('/coffee/1000')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /plain/)
  //     .expect(404, 'Not Found', done);
  // });
  //
  //
  // test('POST /coffee/:id', (done) => {
  //   request(server)
  //     .post('/coffee/2')
  //     .set('Accept', 'application/json')
  //     .send({
  //       producer_id: 2,
  //       name: 'Ethiopia Bulga',
  //       flavor_profile: 'Cotton Candy, Strawberry, Sugar, Tangerine',
  //       varieties: 'Heirloom',
  //       description: 'delicious',
  //     })
  //   .expect('Content-Type', /json/)
  //   .expect((res) => {
  //     delete res.body.createdAt;
  //     delete res.body.updatedAt;
  //   })
  //   .expect(200, {
  //     id: 2,
  //     producerId: 2,
  //     name: 'Ethiopia Bulga',
  //     flavorProfile: 'Cotton Candy, Strawberry, Sugar, Tangerine',
  //     varieties: 'Heirloom',
  //     description: 'delicious',
  //   }, done);
  //     /* eslint-enable max-len */
  // });
  //
  // test('POST /coffee/:id without name', (done) => {
  //   request(server)
  //     .post('/coffee/2')
  //     .set('Accept', 'application/json')
  //     .send({
  //       producer_id: 2,
  //       // name: 'Ethiopia Bulga',
  //       flavor_profile: 'Cotton Candy, Strawberry, Sugar, Tangerine',
  //       varieties: 'Heirloom',
  //       description: 'delicious',
  //     })
  //   .expect('Content-Type', /plain/)
  //   .expect(400, 'Coffee name required', done);
  //     /* eslint-enable max-len */
  // });
  //

  /* eslint-enable max-len */

}));
