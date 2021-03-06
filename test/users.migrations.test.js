'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils');
suite('users migrations', addDatabaseHooks(() => {
  test('users columns', (done) => {
    knex('users').columnInfo()
    .then((actual) => {
      const expected = {
        user_id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: 'nextval(\'users_user_id_seq\'::regclass)'
        },

        first_name: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        last_name: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        username: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: null
        },

        user_email: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: null
        },

        hashed_password: {
          type: 'character',
          maxLength: 60,
          nullable: false,
          defaultValue: null
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
