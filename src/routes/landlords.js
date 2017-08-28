'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');

const Landlord = require('../controllers/landlords.js');

const router = express.Router();

const landlord = new Landlord();


router.get('/landlords', (req, res) => {
  landlord.getLandlord()
    .then(landlord => {
      res.send(landlord);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
