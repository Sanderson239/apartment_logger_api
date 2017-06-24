'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')

suite('profiles seeds', addDatabaseHooks(() => {
  test('profiles rows', (done) => {
    knex('profiles').orderBy('profile_id', 'ASC')
      .then((actual) => {
        /* eslint-disable max-len */
        const expected = [{
          profile_id: 1,
          profile_display_name: 'Rowling Display Name',
          user_id: 1,
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        }];

        /* eslint-enable max-len */

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row profile_id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
