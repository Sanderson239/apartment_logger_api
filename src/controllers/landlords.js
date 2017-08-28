'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Landlords {
  getLandlord() {
    return knex('landlords')
      .orderBy('landlord_id')
      .then((result) => camelizeKeys(result));
  }

  getLandlordById(landlord_id) {
    return knex('landlords')
      .where('landlord_id', landlord_id)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  // addLandlord(landlord) {
  //   return knex('landlords')
  //     .insert(landlord,'*')
  //     .then((result) => {
  //       return camelizeKeys(result)
  //     });
  // }
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
  // deleteLandlord(landlord_id) {
  //   return knex('landlords')
  //     .del()
  //     .where('landlord_id', landlord_id)
  //     .returning('*')
  //     .then((result) => {
  //       return camelizeKeys(result)
  //     });
  // }
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

module.exports = Landlords;
