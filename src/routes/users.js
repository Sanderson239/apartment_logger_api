'use strict';

const bcrypt = require( 'bcrypt' );
const bodyParser = require( 'body-parser' );
const express = require('express');
const { decamelizeKeys, camelizeKeys } = require('humps');

const User = require('../controllers/users');
const saltRounds = 10;
const users = new User();

const router = express.Router();
// eslint-disable-next-line new-cap

/**
 * @api {get} /users List all users
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiSuccess {Object[]} users Users list
 * @apiSuccess {Number} user_id User user_id
 * @apiSuccess {String} firstName User first name
 * @apiSuccess {String} lastName User last name
 * @apiSuccess {String} username User username
 * @apiSuccess {String} user_email User user_email
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *   [
      {
        "user_email": "coffeeAdmin@example.com",
        "firstName": "Coffee",
        "user_id": 1,
        "lastName": "Admin",
        "username": "coffeeAdmin"
      },
      {
        "user_user_email": "gordon@example.com",
        "firstName": "Gordon",
        "user_id": 2,
        "lastName": "Ramsey",
        "username": "gramsey"
      }
    ]
 * @apiErrorExample {json} User list not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/users', (req, res) => {
  users.getUsers()
    .then((users) => {
      if (!users) {
        res.sendStatus(404);
        return;
      }
      res.send(users);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

/**
 * @api {get} /users/:id List user with the given user_id
 * @apiVersion 1.0.0
 * @apiGroup Users
 *
 * @apiParam {Number} user_id User unique user_id
 *
 * @apiSuccess {Object} User object
 * @apiSuccess {Number} user_id User user_id
 * @apiSuccess {String} firstName User first name
 * @apiSuccess {String} lastName User last name
 * @apiSuccess {String} username User username
 * @apiSuccess {String} user_user_email User user_user_email
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
        "user_user_email": "coffeeAdmin@example.com",
        "firstName": "Coffee",
        "user_id": 1,
        "lastName": "Admin",
        "username": "coffeeAdmin"
      }
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/users/:id', (req, res) => {
  const user_id = req.params.id;
  users.getUserById(user_id)
    .then((user) => {
      if (user.length === 0) {
        res.sendStatus(404);
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

const REQUIRED_FIELDS = {
  userEmail: 'Email',
  firstName: 'First name',
  lastName: 'Last name',
  password: 'Password',
  username: 'Username',
};

/**
 * @api {post} /users/ User registration
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiSuccess {Object} user object
 * @apiSuccess {Number} user_id User user_id
 * @apiSuccess {String} firstName User first name
 * @apiSuccess {String} lastName User last name
 * @apiSuccess {String} username User username
 * @apiSuccess {String} user_email User user_email
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
        "user_email": "johnappleseed@example.com",
        "firstName": "John",
        "user_id": 4,
        "lastName": "Appleseed",
        "username": "coffeesnob"
      }
 * @apiErrorExample {text} Missing fields error stack
 *    HTTP/1.1 400 Bad Request
 *    Email is required.
 *    First name is required.
 *    Last name is required.
 *    Password is required.
 *    Username is required.
 * @apiErrorExample {json} Add user error
 *    HTTP/1.1 400 Bad request
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/users', (req, res) => {
  const userToAdd = {};
  const errors = [];
  Object.keys(REQUIRED_FIELDS).forEach(field => {
    if (!req.body[field]) {
      errors.push(REQUIRED_FIELDS[field] + ' is required.');
      return;
    }
    userToAdd[field] = req.body[field];
  });
  if (errors.length > 0) {
    res.status(400)
      .set('Content-Type', 'text/plain')
      .send(errors.join(' '));
    return;
  }

  if (userToAdd.password.length < 8) {
    res.status(400)
      .set('Content-Type', 'text/plain')
      .send('Password must be at least 8 characters long');
    return;
  }

  bcrypt.hash(userToAdd.password, saltRounds).then(hashedPassword => {
    delete userToAdd.password;
    userToAdd.hashedPassword = hashedPassword;
    return users.addUser(userToAdd)
      .then(result => {
        if (!result) {
          res.sendStatus(400);
          return;
        }
        res.status(200).send(camelizeKeys(result));
      });
  })
  .catch(err => {
    res.sendStatus(500);
  });
});

/**
 * @api {post} /users/:id User updates
 * @apiVersion 1.0.0
 * @apiGroup Users
 *
 * @apiParam {Number} user_id User unique user_id
 *
 * @apiSuccess {Object} user object
 * @apiSuccess {Number} user_id User user_id
 * @apiSuccess {String} firstName User first name
 * @apiSuccess {String} lastName User last name
 * @apiSuccess {String} username User username
 * @apiSuccess {String} user_email User user_email
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
        "user_email": "gordon@example.com",
        "firstName": "Gordo",
        "user_id": 2,
        "lastName": "Ramsey",
        "username": "gramsey"
      }
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/users/:id', (req, res) => {
  const fieldsToUpdate = ['firstName', 'lastName', 'userEmail'];
  const updatedFields = {};
  fieldsToUpdate.forEach( field => {
    if (req.body[field]) {
      updatedFields[field] = req.body[field];
    }
  });
  const user_id = req.params.id;
  const password = req.body.password;

  return users.updateUser(user_id, updatedFields)
    .then(result => {
      if (!result) {
        res.sendStatus(404);
        return;
      }
      res.status(200).set('Content-Type',
       'application/json').send(camelizeKeys(result));
    })
    .catch(err => {
      res.sendStatus(500);
    });
})

module.exports = router;
