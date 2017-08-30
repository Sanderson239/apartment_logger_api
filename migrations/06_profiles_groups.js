
exports.up = function(knex) {
  return knex.schema.createTable('profiles_groups', (table) => {
    table.increments('profiles_groups_id').primary();
    table.integer('profile_id').references('profiles.profile_id').notNullable().onDelete('CASCADE');
    table.integer('group_id').references('groups.group_id').notNullable().onDelete('CASCADE');
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('profiles_groups');
}
