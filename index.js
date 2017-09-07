'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join('public')));


const apartments = require('./src/routes/apartments');
const landlords = require('./src/routes/landlords');
const profiles = require('./src/routes/profiles');
const groups = require('./src/routes/groups');
const apartments_groups = require('./src/routes/apartments_groups');
const users = require('./src/routes/users');
const login = require('./src/routes/login');



app.use(apartments);
app.use(landlords);
app.use(profiles);
app.use(groups);
app.use(apartments_groups);
app.use(users);
app.use(login);


app.use((req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});


let port = process.env.PORT || 8000;

if (app.get('env') === 'test') { port = 8080; }

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
