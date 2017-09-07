
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex("users").insert([
        {
          user_id: 1,
          first_name: 'Coffee',
          last_name: 'Admin',
          username: 'coffeeAdmin',
          user_email: 'coffeeAdmin@example.com',
          hashed_password: '$2a$10$v9CRN8wan26gmPmeavSf7OSCyNWKtJMQwinDGX3GJYsP5EXNAaKXG',
          // 'gotjitters'
          access: 'admin',
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        },
        {
          user_id: 2,
          first_name: 'Gordon',
          last_name: 'Ramsey',
          username: 'gramsey',
          user_email: 'gordon@example.com',
          hashed_password: '$2a$10$aF9NUiBORPN14iYsrNqAIOE3mZsAwYf.cgo9/PkAb3Xro23elzywO',
          // 'hellskitchen'
          access: 'registered',
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        }
    ]).then( () => {
        return knex.raw("SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users));");
      });
    });
};
