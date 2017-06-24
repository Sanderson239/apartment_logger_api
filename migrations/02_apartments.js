
exports.up = function(knex, Promise) {
  // UP adds / creates tables / fields to the DB
  return knex.schema.createTable('apartments', (table) => {
    table.increments('apartment_id').primary();
    table.string('apartment_name').notNullable().defaultTo('');
    table.string('street').notNullable().defaultTo('');
    table.string('city').notNullable().defaultTo('');
    table.string('state').notNullable().defaultTo('');
    table.string('country').notNullable().defaultTo('');
    table.string('zip').notNullable().defaultTo('');
    table.string('latitude').notNullable().defaultTo('');
    table.string('longitude').notNullable().defaultTo('');
    //on user submition of apt input, if landlord already exists, add id here, if doesn't exite creates new landlord and adds corresponding id here
    table.integer('landlord_id').notNullable().references('landlords.landlord_id').onDelete('cascade');
    table.integer('sqr_footage').notNullable().defaultTo(0);
    table.integer('bedrooms').notNullable().defaultTo(0);
    table.integer('bathrooms').notNullable().defaultTo(0);
    table.integer('beds').notNullable().defaultTo(0);
    table.text('apartment_description').notNullable().defaultTo('');
    table.text('apt_url').notNullable().defaultTo('');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  // DROP deletes /drops tables/fields from DB
  return knex.schema.dropTable('apartments');
};
