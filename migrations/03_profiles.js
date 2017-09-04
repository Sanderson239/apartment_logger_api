exports.up = function(knex, Promise) {
  //should have group id
  return knex.schema.createTable('profiles', (table) => {
    table.increments('profile_id').primary();
    table.string('profile_display_name').notNullable().defaultTo('');
    table.integer('user_id').notNullable().references('users.user_id').onDelete('cascade');
    table.integer('group_id').references('groups.group_id').onDelete('cascade');
    table.string('description').notNullable().defaultTo('');
    table.string('cleanliness').notNullable().defaultTo('');
    table.string('guests').notNullable().defaultTo('');
    table.string('party_habits').notNullable().defaultTo('');
    table.string('wake_up').notNullable().defaultTo('');
    table.string('sleep').notNullable().defaultTo('');
    table.string('smoker').notNullable().defaultTo('');
    table.string('work_schedule').notNullable().defaultTo('');
    table.string('occupation').notNullable().defaultTo('');
    table.string('spoken_languages').notNullable().defaultTo('');;
    table.string('sex').notNullable().defaultTo('');
    table.string('age').notNullable().defaultTo('');
    table.string('relationship_status').notNullable().defaultTo('');
    table.string('zodiac').notNullable().defaultTo('');
    table.string('monthly_budget').notNullable().defaultTo('');
    table.string('location').notNullable().defaultTo('');
    table.string('move_in_date').notNullable().defaultTo('');
    table.string('move_out_date').notNullable().defaultTo('');
    table.string('tags').notNullable().defaultTo('');
    table.string('looking_for_new_room').notNullable().defaultTo('');
    table.string('preferred_sex').notNullable().defaultTo('');
    table.string('preferred_age').notNullable().defaultTo('');
    table.string('preferred_smoking').notNullable().defaultTo('');
    table.string('preferred_languages_spoken').notNullable().defaultTo('');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profiles');
};
