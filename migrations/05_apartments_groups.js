
exports.up = function(knex) {
  return knex.schema.createTable('apartments_groups', (table) => {
    table.increments('apartments_groups_id').primary();
    table.integer('apartment_id').references('apartments.apartment_id').notNullable().onDelete('CASCADE');
    table.integer('group_id').references('groups.group_id').notNullable().onDelete('CASCADE');
    table.integer('profile_id').references('profiles.profile_id').notNullable().onDelete('CASCADE');
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('apartments_groups');
}