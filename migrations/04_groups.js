
exports.up = function(knex) {
  return knex.schema.createTable('groups', (table) => {
    table.increments('group_id').primary();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groups');
};
