'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')
suite('part1 seeds', addDatabaseHooks(() => {
  test('apartments rows', (done) => {
    knex('apartments').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [{
        id: 1,
        name: 'home',
        street: 'fsdafa',
        city: 'SF',
        state: 'CA',
        country: 'USA',
        zip: 1321,
        latitude: 32132,
        longitude: 3213,
        // landlord_id: 1,
        sqr_footage: 12321,
        bedrooms: 3213,
        bathrooms:986546,
        beds: 32132,
        description: 'great place to live',
        apt_url: 'something.com',
        created_at: new Date('2017-05-14 12:23:00 UTC'),
        updated_at: new Date('2017-05-14 12:23:00 UTC'),
      }, {
      id: 2,
      name: 'home',
      street: 'fsdafa',
      city: 'SF',
      state: 'CA',
      country: 'USA',
      zip: 1321,
      latitude: 32132,
      longitude: 3213,
      // landlord_id: 2,
      sqr_footage: 12321,
      bedrooms: 3213,
      bathrooms:986546,
      beds: 32132,
      description: 'great place to live',
      apt_url: 'something.com',
      created_at: new Date('2017-05-14 12:23:00 UTC'),
      updated_at: new Date('2017-05-14 12:23:00 UTC'),
    }, {
    id: 3,
    name: 'home',
    street: 'fsdafa',
    city: 'SF',
    state: 'CA',
    country: 'USA',
    zip: 1321,
    latitude: 32132,
    longitude: 3213,
    // landlord_id: 1,
    sqr_footage: 12321,
    bedrooms: 3213,
    bathrooms:986546,
    beds: 32132,
    description: 'great place to live',
    apt_url: 'something.com',
    created_at: new Date('2017-05-14 12:23:00 UTC'),
    updated_at: new Date('2017-05-14 12:23:00 UTC'),
  }];


        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
