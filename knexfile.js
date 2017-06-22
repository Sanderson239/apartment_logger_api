'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/apartment_logger_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/apartment_logger_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
