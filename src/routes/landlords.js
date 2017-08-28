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

router.get('/landlords/:id', (req, res) => {
  const id = req.params.id;
  landlord.getLandlordById(id)
    .then(apt => {
      if (!apt || landlord.length === 0) {
         res.sendStatus(404);
         return;
      }
      res.send(apt);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
