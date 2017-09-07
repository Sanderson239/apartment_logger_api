'use strict';

const bcrypt = require( 'bcrypt' );
const bodyParser = require( 'body-parser' );
const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

const saltRounds = 10;

class Users {
  getUsers() {
    return knex('users')
      .select('user_id', 'username', 'first_name', 'last_name', 'user_email')
      .orderBy('user_id')
      .then((result) => camelizeKeys(result));
  }

  getUserById(user_id) {
    return knex('users')
      .select('user_id', 'username', 'first_name', 'last_name', 'user_email')
      .where('user_id', user_id)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  getUser(user_id) {
    return knex('users')
      .select('user_id', 'username', 'first_name', 'last_name', 'user_email')
      .where(knex.raw('LOWER("user_email") = ?', user_email.toLowerCase()))
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  getUserByUsername(username) {
    return knex('users')
      .select('user_id', 'username', 'first_name', 'last_name', 'user_email', 'hashed_password')
      .where(knex.raw('LOWER("username") = ?', username.toLowerCase()))
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  addUser(userToAdd) {
    const columns = ['first_name', 'last_name', 'username', 'user_email'];
    return knex('users')
      .insert(decamelizeKeys(userToAdd), ['first_name', 'last_name', 'username', 'user_email'])
      .returning([...columns, 'user_id'])
      .then((result) => {
        return camelizeKeys(result[0]);
      });
  }

  updateUser(user_id, fieldsToUpdate) {
    fieldsToUpdate = decamelizeKeys(fieldsToUpdate);
    return knex('users')
      .select('*')
      .where('user_id', user_id)
      .update(fieldsToUpdate, ['user_id', 'first_name', 'last_name', 'user_email', 'username'])
      .then((updatedUser) => {
        return camelizeKeys(updatedUser[0]);
      });
  }
}

module.exports = Users;
