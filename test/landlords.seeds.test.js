'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')

suite('part3 seeds', addDatabaseHooks(() => {
  test('landlords rows', (done) => {
    knex('landlords').orderBy('landlord_id', 'ASC')
      .then((actual) => {
        /* eslint-disable max-len */
        const expected = [{
          landlord_id: 1,
          landlord_name: 'Firstname Lastname',
          landlord_email: 'landlord@mail.com',
          phone_number: '111-111-1111',
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        }];

        /* eslint-enable max-len */

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row landlord_id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
