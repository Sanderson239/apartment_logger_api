'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils');
suite('profiles_groups migrations', addDatabaseHooks(() => {
  test('profiles_groups columns', (done) => {
    knex('profiles_groups').columnInfo()
    .then((actual) => {
      const expected = {
        group_id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: 'nextval(\'profiles_groups_profiles_group_id_seq\'::regclass)'
        },

        profile_id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: null
        },

        group_id: {
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