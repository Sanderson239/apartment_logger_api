'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');

const Apartment = require('../controllers/apartments.js');

const router = express.Router();

const apartment = new Apartment();

router.get('/apartments', (req, res) => {
  apartment.getApartment()
    .then(apartment => {
      res.send(apartment);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/apartments/:id', (req, res) => {
  const id = req.params.id;
  apartment.getApartmentById(id)
    .then(apt => {
      if (!apt || apartment.length === 0) {
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
