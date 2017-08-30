
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('apartments_groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('apartments_groups').insert([
        {
          apartments_groups_id: 1,
          apartment_id: 2,
          group_id: 1,
          profile_id: 1,
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC'),
        }
      ]);
    });
};
