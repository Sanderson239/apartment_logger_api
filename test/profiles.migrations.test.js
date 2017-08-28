'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils');
suite('profiles migrations', addDatabaseHooks(() => {
  test('profiles columns', (done) => {
    knex('profiles').columnInfo()
    .then((actual) => {
      const expected = {
        profile_id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: 'nextval(\'profiles_profile_id_seq\'::regclass)'
        },

        profile_display_name: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        user_id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: null
        },

        description: {
          type: 'character varying',
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        cleanliness: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        guests: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        party_habits: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        wake_up: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        sleep: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        smoker: {
          type: 'boolean',
          nullable: false,
          defaultValue: false
        },

        work_schedule: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        occupation: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        spoken_languages: {
          type: 'json',
        },

        sex: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        age: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: null
        },

        relationship_status: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        zodiac: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        monthly_budget: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        location: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        move_in_date: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        move_out_date: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        tags: {
          type: 'json',
        },

        looking_for_new_room: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        preferred_sex: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        preferred_age: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: null
        },

        preferred_smoking: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        preferred_languages_spoken: {
          type: 'json',
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
