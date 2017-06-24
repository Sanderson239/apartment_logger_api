
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('apartments').del()
    .then( () => {
      // Inserts seed entries
      return knex('apartments').insert([
        {
        apartment_id: 1,
        apartment_name: 'home',
        street: 'fsdafa',
        city: 'SF',
        state: 'CA',
        country: 'USA',
        zip: '1321',
        latitude: '32132',
        longitude: '3213',
        landlord_id: 1,
        sqr_footage: 12321,
        bedrooms: 3213,
        bathrooms:986546,
        beds: 32132,
        apartment_description: 'great place to live',
        apt_url: 'something.com',
        created_at: new Date('2017-05-14 12:23:00 UTC'),
        updated_at: new Date('2017-05-14 12:23:00 UTC'),
      },
      {
      apartment_id: 2,
      apartment_name: 'home',
      street: 'fsdafa',
      city: 'SF',
      state: 'CA',
      country: 'USA',
      zip: '1321',
      latitude: '32132',
      longitude: '3213',
      landlord_id: 2,
      sqr_footage: 12321,
      bedrooms: 3213,
      bathrooms:986546,
      beds: 32132,
      apartment_description: 'great place to live',
      apt_url: 'something.com',
      created_at: new Date('2017-05-14 12:23:00 UTC'),
      updated_at: new Date('2017-05-14 12:23:00 UTC'),
    },
    {
    apartment_id: 3,
    apartment_name: 'home',
    street: 'fsdafa',
    city: 'SF',
    state: 'CA',
    country: 'USA',
    zip: '1321',
    latitude: '32132',
    longitude: '3213',
    landlord_id: 1,
    sqr_footage: 12321,
    bedrooms: 3213,
    bathrooms:986546,
    beds: 32132,
    apartment_description: 'great place to live',
    apt_url: 'something.com',
    created_at: new Date('2017-05-14 12:23:00 UTC'),
    updated_at: new Date('2017-05-14 12:23:00 UTC'),
  }
      ]);
    })
    .then(function(){
            return knex.raw(`SELECT setval('apartments_apartment_id_seq', (SELECT MAX(apartment_id) FROM apartments))`)
        });
};
