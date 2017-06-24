'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils');
suite('landlords migrations', addDatabaseHooks(() => {
  test('landlords columns', (done) => {
    knex('landlords').columnInfo()
    .then((actual) => {
      const expected = {
        landlord_id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: 'nextval(\'landlords_landlord_id_seq\'::regclass)'
        },

        landlord_name: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        landlord_email: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        created_at: {
          type: 'timestamp with time zone',
          maxLength: null,
          nullable: false,
          defaultValue: 'now()'
        },

        updated_at: {
          type: 'timestamp with time zone',
          maxLength: null,
          nullable: false,
          defaultValue: 'now()'
        }
      };

      for (const column in expected) {
        assert.deepEqual(
          actual[column],
          expected[column],
          `Column ${column} is not the same`
        );
      };

      done()
      // .catch((err) => {
      //   done(err);
      // });
    });
  });
}));
