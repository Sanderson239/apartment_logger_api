exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('landlords').del()
    .then(() => {
      // Inserts seed entries
      return knex('landlords').insert(
[{
  landlord_id: 1,
  landlord_name: 'Firstname Lastname',
  landlord_email: 'landlord@mail.com',
  phone_number: '111-111-1111',
  created_at: new Date('2016-06-29 14:26:16 UTC'),
  updated_at: new Date('2016-06-29 14:26:16 UTC')
}, {
  landlord_id: 2,
  landlord_name: 'Firstname Lastname',
  landlord_email: 'landlord@mail.com',
  phone_number: '111-111-1111',
  created_at: new Date('2016-06-29 14:26:16 UTC'),
  updated_at: new Date('2016-06-29 14:26:16 UTC')
}]);
  })
  .then(function(){
            return knex.raw(`SELECT setval('landlords_landlord_id_seq', (SELECT MAX(landlord_id) FROM landlords))`)
        });
};
