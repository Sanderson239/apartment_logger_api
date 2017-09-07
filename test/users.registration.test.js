'use strict';

process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const { suite, test } = require('mocha');
const request = require('supertest');
const bcrypt = require('bcrypt');
const knex = require('../knex.js');
const server = require('../index.js');
const { addDatabaseHooks } = require('./utils.js');

suite('users - new user registration error check', addDatabaseHooks(() => {
  test('POST /users with multiple missing required fields', (done) => {
    request(server)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: 'johnsiracusa',
        password: 'ilikebigcats'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Email is required. First name is required. Last name is required.', done);
  });

  test('POST /users with no email', (done) => {
    request(server)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'John',
        lastName: 'Siracusa',
        username: 'johnsiracusa',
        password: 'ilikebigcats'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Email is required.', done);
  });

  test('POST /users with no first name', (done) => {
    request(server)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        lastName: 'Siracusa',
        username: 'johnsiracusa',
        userEmail: 'john.siracusa@example.com',
        password: 'ilikebigcats'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'First name is required.', done);
  });

  test('POST /users with no last name', (done) => {
    request(server)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'John',
        username: 'johnsiracusa',
        userEmail: 'john.siracusa@example.com',
        password: 'ilikebigcats'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Last name is required.', done);
  });

  test('POST /users with no username', (done) => {
    request(server)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'John',
        lastName: 'Siracusa',
        userEmail: 'john.siracusa@example.com',
        password: 'ilikebigcats'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Username is required.', done);
  });

  test('POST /users with no password', (done) => {
    request(server)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'John',
        lastName: 'Siracusa',
        username: 'johnsiracusa',
        userEmail: 'john.siracusa@example.com'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Password is required.', done);
  });

  test('POST /users with existing email', addDatabaseHooks((done) => {
    /* eslint-disable no-sync */
    knex('users')
      .insert({
        first_name: 'John',
        last_name: 'Siracusa',
        username: 'johnsiracusa',
        user_email: 'john.siracusa@example.com',
        hashed_password: bcrypt.hashSync('ilikebigcats', 1)
      })
      .then(() => {
        request(server)
          .post('/users')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .send({
            firstName: 'John',
            lastName: 'Siracusa',
            username: 'johnsiracusa',
            userEmail: 'john.siracusa@example.com',
            password: 'ilikebigcats'
          })
          .expect('Content-Type', /plain/)
          .expect(400, 'Email already exists', done);
      })
      .catch((err) => {
        done(err);
      });
      /* eslint-enable no-sync */
  }));

}));
