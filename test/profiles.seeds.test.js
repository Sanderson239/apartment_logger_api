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
          user_id: 1,
          group_id: null,
          profile_display_name: 'Rowling Display Name',
          description: 'I am a good roommate',
          cleanliness: 'very clean',
          guests: 'rarely',
          party_habits: 'never',
          wake_up: '7:00AM',
          sleep: '12:00AM',
          smoker: 'false',
          work_schedule: 'varies',
          occupation: 'student',
          spoken_languages: "[\"English\",\"Korean\",\"Chinese\"]",
          sex: 'Male',
          age: '26',
          relationship_status: 'single',
          zodiac: 'Taurus',
          monthly_budget: '1500',
          location: 'San Francisco',
          move_in_date: '2017-11-01',
          move_out_date: '2018-05-01',
          tags: "[]",
          looking_for_new_room: 'true',
          preferred_sex: 'Male',
          preferred_age: 'any',
          preferred_smoking: 'false',
          preferred_languages_spoken: "[\"any\"]",
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
