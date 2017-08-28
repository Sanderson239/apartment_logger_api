'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex.js');
const server = require('../index.js');
const { addDatabaseHooks } = require('./utils.js')
suite('landlords routes', addDatabaseHooks(() => {
  test('GET /landlords', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/landlords')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          landlordId: 1,
          landlordName: 'Firstname Lastname',
          landlordEmail: 'landlord@mail.com',
          phoneNumber: '111-111-1111',
          createdAt: '2016-06-29T14:26:16.000Z',
          updatedAt: '2016-06-29T14:26:16.000Z'
        }, {
          landlordId: 2,
          landlordName: 'Firstname Lastname',
          landlordEmail: 'landlord@mail.com',
          phoneNumber: '111-111-1111',
          createdAt: '2016-06-29T14:26:16.000Z',
          updatedAt: '2016-06-29T14:26:16.000Z'
        }
      ], done);
    /* eslint-enable max-len */
  });
}));
