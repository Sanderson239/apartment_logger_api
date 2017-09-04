
exports.up = function(knex) {
  //should have user id
  return knex.schema.createTable('apartments_groups', (table) => {
    table.increments('apartments_groups_id').primary();
    table.integer('user_id').notNullable().references('users.user_id').onDelete('cascade');
    table.integer('apartment_id').notNullable().references('apartments.apartment_id').onDelete('CASCADE');
    table.integer('group_id').notNullable().references('groups.group_id').onDelete('CASCADE');
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('apartments_groups');
}
