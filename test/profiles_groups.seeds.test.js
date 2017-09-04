// 'use strict';
//
// process.env.NODE_ENV = 'test';
//
// const assert = require('chai').assert;
// const { suite, test } = require('mocha');
// const knex = require('../knex');
// const { addDatabaseHooks } = require('./utils')
//
// suite('profiles_groups seeds', addDatabaseHooks(() => {
//   test('profiles_groups rows', (done) => {
//     knex('profiles_groups').orderBy('profiles_groups_id', 'ASC')
//       .then((actual) => {
//         /* eslint-disable max-len */
//         const expected = [
//           {
//           profiles_groups_id: 1,
//           group_id: 1,
//           profile_id: 1,
//           created_at: new Date('2016-06-29 14:26:16 UTC'),
//           updated_at: new Date('2016-06-29 14:26:16 UTC'),
//         }
//       ];
//
//         for (let i = 0; i < expected.length; i++) {
//           assert.deepEqual(
//             actual[i],
//             expected[i],
//             `Row group_id=${i + 1} not the same`
//           );
//         }
//
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// }));
