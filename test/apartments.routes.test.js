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
  // test('POST /coffee', (done) => {
  //   request(server)
  //     .post('/coffee')
  //     .set('Accept', 'application/json')
  //     .send({
  //       producer_id: 2,
  //       name: 'The jittery beatle',
  //       flavor_profile: 'caffeinated, salty, bitter',
  //       varieties: '',
  //       description: 'Don\'t drink this.'
  //     })
  //   .expect('Content-Type', /json/)
  //   .expect((res) => {
  //     delete res.body.createdAt;
  //     delete res.body.updatedAt;
  //   })
  //   .expect(200, {
  //     id: 5,
  //     producerId: 2,
  //     name: 'The jittery beatle',
  //     flavorProfile: 'caffeinated, salty, bitter',
  //     varieties: '',
  //     description: 'Don\'t drink this.'
  //   }, done);
  //     /* eslint-enable max-len */
  // });
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
  // test('DELETE /coffee/:id', (done) => {
  //   request(server)
  //     .del('/coffee/1')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200, [{
  //       id: 1,
  //       name: 'Three Africas',
  //       producerId: 1,
  //       flavorProfile: 'Fruity, radiant, creamy',
  //       varieties: 'Heirloom',
  //       description: 'Lorem ipsum',
  //       createdAt: '2017-06-23T14:56:16.000Z',
  //       updatedAt: '2017-06-23T14:56:16.000Z'
  //     }], done);
  //
  // });
  /* eslint-enable max-len */

}));
