exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert(
[{
  user_id: 1,
  first_name: 'Joanne',
  last_name: 'Rowling',
  username: 'jkrowling',
  user_email: 'jkrowling@gmail.com',
  hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',  // youreawizard
  created_at: new Date('2016-06-29 14:26:16 UTC'),
  updated_at: new Date('2016-06-29 14:26:16 UTC')
}]);
  })
  .then(function(){
            return knex.raw(`SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users))`)
        });
};
