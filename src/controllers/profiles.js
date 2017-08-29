'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Profiles {
  getProfile() {
    return knex('profiles')
      .orderBy('profile_id')
      .then((result) => camelizeKeys(result));
  }

  getProfileById(profile_id) {
    return knex('profiles')
      .where('profile_id', profile_id)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  addProfile(profile) {
    return knex('profiles')
      .insert(profile,'*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }
//
//   updateCoffee(coffee) {
//     return knex('coffee')
//       .where('id', coffee.id)
//       .update({
//         producerId: coffee.producerId,
//         name: coffee.name,
//         flavorProfile: coffee.flavorProfile,
//         varieties: coffee.varieties,
//         description: coffee.description}, '*')
//       .then((result) => {
//         return camelizeKeys(result)
//       });
//   }
//
  deleteProfile(profile_id) {
    return knex('profiles')
      .del()
      .where('profile_id', profile_id)
      .returning('*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }
//
//   // just used for checking that both coffee and region exist
//   getCoffeeAndRegionIds(coffeeId, regionId) {
//     return knex.select('coffee.id as coffee_id','regions.id as region_id')
//       .from('coffee').crossJoin('regions')
//       .where('coffee.id', coffeeId).where('regions.id', regionId)
//       .first()
//       .then((result) => {
//         console.log(result);
//         return camelizeKeys(result);
//       });
//   }
//
//   // add a record to coffee_joins table
//   addCoffeeAndRegionIds(ids) {
//     return knex('coffee_regions')
//       .insert(decamelizeKeys(ids), '*')
//       .then((result) => camelizeKeys(result[0]));
//   }
}

module.exports = Profiles;
