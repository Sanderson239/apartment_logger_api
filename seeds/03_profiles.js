
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([{
        profile_id: 1,
        user_id: 1,
        group_id: 1,
        profile_display_name: 'Rowling Display Name',
        description: 'I am a good roommate',
        cleanliness: 'very clean',
        guests: 'rarely',
        party_habits: 'never',
        wake_up: '7:00AM',
        sleep: '12:00AM',
        smoker: 'false',
        work_schedule: 'varies',
        occupation: 'student',
        spoken_languages: JSON.stringify(['English', 'Korean', 'Chinese']),
        sex: 'Male',
        age: '26',
        relationship_status: 'single',
        zodiac: 'Taurus',
        monthly_budget: '1500',
        location: 'San Francisco',
        move_in_date: '2017-11-01',
        move_out_date: '2018-05-01',
        tags: JSON.stringify([]),
        looking_for_new_room: 'true',
        preferred_sex: 'Male',
        preferred_age: 'any',
        preferred_smoking: 'false',
        preferred_languages_spoken: JSON.stringify(['any']),
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    });
};
