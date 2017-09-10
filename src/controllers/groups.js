'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Groups {
  getGroup() {
    return knex('groups')
      .orderBy('group_id')
      .then((result) => camelizeKeys(result));
  }

  getGroupById(user_id) {
    return knex('groups')
      .where('user_id', user_id)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  addGroup(group) {
    return knex('groups')
      .insert(group,'*')
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
  deleteGroup(group_id) {
    return knex('groups')
      .del()
      .where('group_id', group_id)
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

module.exports = Groups;
