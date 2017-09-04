'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex.js');
const server = require('../index.js');
const { addDatabaseHooks } = require('./utils.js')
suite('groups routes', addDatabaseHooks(() => {
  test('GET /groups', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/groups')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          groupId: 1,
          userId: 1,
          createdAt: '2016-06-29T14:26:16.000Z',
          updatedAt: '2016-06-29T14:26:16.000Z'
        }
      ], done);
    /* eslint-enable max-len */
  });

  test('GET /groups/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/groups/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        groupId: 1,
        userId: 1,
        createdAt: '2016-06-29T14:26:16.000Z',
        updatedAt: '2016-06-29T14:26:16.000Z'
      }, done);
  });

  test('POST /groups', (done) => {
    request(server)
      .post('/groups')
      .set('Accept', 'application/json')
      .send({
        group_id: 2,
        user_id:1,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      })
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body.createdAt;
      delete res.body.updatedAt;
    })
    .expect(200, {
      groupId: 2,
      userId:1,
    }, done);
  });

  test('DELETE /groups/:id', (done) => {
    request(server)
      .del('/groups/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        groupId: 1,
        userId: 1,
        createdAt: '2016-06-29T14:26:16.000Z',
        updatedAt: '2016-06-29T14:26:16.000Z',
      }], done);
  });
}));
