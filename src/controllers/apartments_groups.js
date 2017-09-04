'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Apartments_groups {
  getAllFavoritesByUserId(group_id) {
    return knex('apartments_groups')
      .select('*')
      .innerJoin('apartments','apartments.apartment_id','apartments_groups.apartment_id')
      .where('group_id', group_id)
      .then((result) => camelizeKeys(result))
      .catch((err) => {
        console.error();
    });
  }
}

module.exports = Apartments_groups;
