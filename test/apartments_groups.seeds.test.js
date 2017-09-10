'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')

suite('group seeds', addDatabaseHooks(() => {
  test('apartments_groups rows', (done) => {
    knex('apartments_groups').orderBy('apartments_groups_id', 'ASC')
      .then((actual) => {
        /* eslint-disable max-len */
        const expected = [
          {
          apartments_groups_id: 1,
          user_id: 1,
          group_id: 1,
          apartment_id: 2,
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC'),
        }
      ];

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row group_id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
