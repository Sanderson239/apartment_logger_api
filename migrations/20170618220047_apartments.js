
exports.up = function(knex, Promise) {
  // UP adds / creates tables / fields to the DB
  return knex.schema.createTable('apartments', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().defaultTo('');
    table.string('street').notNullable().defaultTo('');
    table.string('city').notNullable().defaultTo('');
    table.string('state').notNullable().defaultTo('');
    table.string('country').notNullable().defaultTo('');
    table.integer('zip');
    table.integer('latitude')
    table.integer('longitude')
    //on user submition of apt input, if landlord already exists, add id here, if doesn't exite creates new landlord and adds corresponding id here
    table.integer('landlord_id').notNullable().references('users.id').onDelete('cascade');
    table.integer('sqr_footage');
    table.integer('bedrooms');
    table.integer('bathrooms');
    table.integer('beds');
    table.text('description').notNullable().defaultTo('');
    table.text('apt_url').notNullable().defaultTo('');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  // DROP deletes /drops tables/fields from DB
  return knex.schema.dropTable('apartments');
};
