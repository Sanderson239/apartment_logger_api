exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(() => {
      // Inserts seed entries
      return knex('profiles').insert(
[{
  profile_id: 1,
  profile_display_name: 'Rowling Display Name',
  user_id: 1,
  created_at: new Date('2016-06-29 14:26:16 UTC'),
  updated_at: new Date('2016-06-29 14:26:16 UTC')
}]);
  })
  .then(function(){
            return knex.raw(`SELECT setval('profiles_profile_id_seq', (SELECT MAX(profile_id) FROM profiles))`)
        });
};
