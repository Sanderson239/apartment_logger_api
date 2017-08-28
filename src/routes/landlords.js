'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');

const Landlord = require('../controllers/landlords.js');

const router = express.Router();

const landlords = new Landlord();


router.get('/landlords', (req, res) => {
  landlords.getLandlord()
    .then(landlord => {
      res.send(landlord);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/landlords/:id', (req, res) => {
  const id = req.params.id;
  landlords.getLandlordById(id)
    .then(landlord => {
      if (!landlord || landlord.length === 0) {
         res.sendStatus(404);
         return;
      }
      res.send(landlord);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/landlords', (req, res) => {
  const landlord = req.body;
    landlords.addLandlord(landlord)
    .then(landlord => {
      res.setHeader('Content-Type', 'application/json')
      return res.send(landlord[0]);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

module.exports = router;
