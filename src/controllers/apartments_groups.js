'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Apartments_groups {
  getAllapartmentGroupsByUserId(group_id) {
    return knex('apartments_groups')
      .select('*')
      .innerJoin('apartments','apartments.apartment_id','apartments_groups.apartment_id')
      .where('group_id', group_id)
      .then((result) => camelizeKeys(result))
      .catch((err) => {
        console.error();
    });
  }

  addApartmentsGroups(newApartmentsGroups) {
    return knex('apartments_groups')
      .insert(newApartmentsGroups,'*')
      .then((result) => {
        return camelizeKeys(result)
      })
      .catch((err) => {
        console.error(err);
    });
  }

  deleteApartmentsGroups(apartments_groups_id) {
    return knex('apartments_groups')
    .del()
    .where('apartments_groups_id', apartments_groups_id)
    .returning('*')
    .then((result) => {
        return camelizeKeys(result)
      })
      .catch((err) => {
        console.error(err);
    });
  }
}

module.exports = Apartments_groups;
