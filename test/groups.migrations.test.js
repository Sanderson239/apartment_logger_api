'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils');
suite('groups migrations', addDatabaseHooks(() => {
  test('groups columns', (done) => {
    knex('groups').columnInfo()
    .then((actual) => {
      const expected = {
        group_id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: 'nextval(\'groups_group_id_seq\'::regclass)'
        },

        user_id: {
          type: 'integer',
          maxLength: null,
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
