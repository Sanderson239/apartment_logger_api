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
      street: '550 Battery Street',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      zip: '94111',
      latitude: '',
      longitude: '',
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
    street: '550 Battery Street',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    zip: '94111',
    latitude: '37.7963358',
    longitude: '-122.4002339',
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

  test('GET /apartment/:id that doesn\'t exist', (done) => {
    request(server)
      .get('/apartment/1000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });


  test('POST /apartments/:id', (done) => {
    request(server)
      .post('/apartments/1')
      .set('Accept', 'application/json')
      .send({
      apartment_id: 1,
      apartment_name: 'newHome',
      street: '550 Battery Street',
      city: 'SF',
      state: 'CA',
      country: 'USA',
      zip: '94111',
      latitude: '',
      longitude: '',
      landlord_id: 1,
      sqr_footage: 12321,
      bedrooms: 3213,
      bathrooms:986546,
      beds: 32132,
      apartment_description: 'great place to live',
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
    apartmentId: 1,
    apartmentName: 'newHome',
    street: '550 Battery Street',
    city: 'SF',
    state: 'CA',
    country: 'USA',
    zip: '94111',
    latitude: '37.7963358',
    longitude: '-122.4002339',
    landlordId: 1,
    sqrFootage: 12321,
    bedrooms: 3213,
    bathrooms:986546,
    beds: 32132,
    apartmentDescription: 'great place to live',
    aptUrl: 'something.com',
  }, done);
      /* eslint-enable max-len */
  });
}));
