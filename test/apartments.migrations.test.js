'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')
suite('apartment migrations', addDatabaseHooks(() => {
  test('apartments columns', (done) => {
    knex('apartments').columnInfo()
      .then((actual) => {
        const expected = {
          apartment_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'apartments_apartment_id_seq\'::regclass)'
          },

          apartment_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          street: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          city: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          state: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          country: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          zip: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },


//maybe change these to type float integers
          latitude: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          longitude: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },

          landlord_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },

          sqr_footage: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: '0'
          },

          bedrooms: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: '0'
          },

          bathrooms: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: '0'
          },

          beds: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: '0'
          },

          apartment_description: {
            type: 'text',
            maxLength: null,
            nullable: false,
            defaultValue: '\'\'::text'
          },

          apt_url: {
            type: 'text',
            maxLength: null,
            nullable: false,
            defaultValue: '\'\'::text'
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
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
