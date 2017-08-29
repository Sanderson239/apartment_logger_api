'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Apartments {
  getApartment() {
    return knex('apartments')
      .orderBy('apartment_id')
      .then((result) => camelizeKeys(result));
  }

  getApartmentById(apartment_id) {
    return knex('apartments')
      .where('apartment_id', apartment_id)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  addApartment(apartment) {
    return knex('apartments')
      .insert(apartment,'*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  updateApartment(apartment) {
    const apartment_id = apartment.apartment_id;
    return knex('apartments')
      .where('apartment_id', apartment.apartment_id)
      .update({
      apartment_id: apartment.apartment_id,
      apartment_name: apartment.apartment_name,
      street: apartment.street,
      city: apartment.city,
      state: apartment.state,
      country: apartment.country,
      zip: apartment.zip,
      latitude: apartment.latitude,
      longitude: apartment.longitude,
      landlord_id: apartment.landlord_id,
      sqr_footage: apartment.sqr_footage,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      beds: apartment.beds,
      apartment_description: apartment.apartment_description,
      apt_url: apartment.apt_url,
      created_at: new Date('2017-05-14 12:23:00 UTC'),
      updated_at: new Date('2017-05-14 12:23:00 UTC'),
    }, '*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  deleteApartment(apartment_id) {
    return knex('apartments')
      .del()
      .where('apartment_id', apartment_id)
      .returning('*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }



}

module.exports = Apartments;
