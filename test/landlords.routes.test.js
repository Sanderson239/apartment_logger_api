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

  test('GET /landlords/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/landlords/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        landlordId: 2,
        landlordName: 'Firstname Lastname',
        landlordEmail: 'landlord@mail.com',
        phoneNumber: '111-111-1111',
        createdAt: '2016-06-29T14:26:16.000Z',
        updatedAt: '2016-06-29T14:26:16.000Z'
      }, done);
  });

  test('POST /landlords', (done) => {
    request(server)
      .post('/landlords')
      .set('Accept', 'application/json')
      .send({
        landlord_id: 3,
        landlord_name: 'some name',
        landlord_email: 'somename@mail.com',
        phone_number: '222-222-2222',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, {
      landlordId: 3,
      landlordName: 'some name',
      landlordEmail: 'somename@mail.com',
      phoneNumber: '222-222-2222',
    }, done);
      /* eslint-enable max-len */
  });
}));
