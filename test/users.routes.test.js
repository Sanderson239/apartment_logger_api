'use strict';

process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const { suite, test } = require('mocha');
const request = require('supertest');
const bcrypt = require('bcrypt');
const knex = require('../knex.js');
const server = require('../index.js');
const { addDatabaseHooks } = require('./utils.js');

suite('users routes', addDatabaseHooks(() => {
  test('POST /users', (done) => {
    const password = 'jitterbug';
    request(server)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'Joe',
        lastName: 'Trader',
        username: 'traderjoe',
        user_email: 'joetrader@example.com',
        password
      })
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
        delete res.body.access;
      })
      .expect(200, {
        userId: 3,
        firstName: 'Joe',
        lastName: 'Trader',
        username: 'traderjoe',
        userEmail: 'joetrader@example.com',
      })
      .expect('Content-Type', /json/)
      .end((httpErr, _res) => {
        if (httpErr) {
          return done(httpErr);
        }

        knex('users')
          .where('user_id', 3)
          .first()
          .then((user) => {
            const hashedPassword = user.hashed_password;

            delete user.hashed_password;
            delete user.created_at;
            delete user.updated_at;
            delete user.access;

            assert.deepEqual(user, {
              user_id: 3,
              first_name: 'Joe',
              last_name: 'Trader',
              username: 'traderjoe',
              user_email: 'joetrader@example.com'
            });

            // eslint-disable-next-line no-sync
            const isMatch = bcrypt.compareSync(password, hashedPassword);
            assert.isTrue(isMatch, "passwords don't match");
            done();
          })
          .catch((dbErr) => {
            done(dbErr);
          });
      });
  });

  test('POST /users/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/users/2')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'Gordo',
        password: 'hellskitchen'
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
        delete res.body.acccess;
      })
      .expect(200, {
        userId: 2,
        firstName: 'Gordo',
        lastName: 'Ramsey',
        username: 'gramsey',
        userEmail: 'gordon@example.com',
      }, done);

      /* eslint-enable max-len */
  });

}));
