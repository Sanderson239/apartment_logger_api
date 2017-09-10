exports.up = function(knex, Promise) {
  return knex.schema.createTable('landlords', (table) => {
    table.increments('landlord_id').primary();
    table.string('landlord_name').notNullable().defaultTo('');
    table.string('landlord_email').notNullable().defaultTo('');
    table.string('phone_number').notNullable().defaultTo('');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  // DROP deletes /drops tables/fields from DB
  return knex.schema.dropTable('landlords');
};
