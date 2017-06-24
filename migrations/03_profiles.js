exports.up = function(knex, Promise) {
  return knex.schema.createTable('profiles', (table) => {
    table.increments('profile_id').primary();
    table.string('profile_display_name').notNullable().defaultTo('');
    table.integer('user_id').notNullable().references('users.user_id').onDelete('cascade');
    //add in profile data later
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profiles');
};
