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

router.post('/apartments', (req, res) => {
  const apt = req.body;

  apartment.addApartment(apt)
  .then(apt => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(apt[0]);
  })
    .catch(err => {
      res.sendStatus(500);
    });
});

router.delete('/apartments/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(404);
  }

  apartment.deleteApartment(id)
  .then(deletedApt => {
    if (!deletedApt[0]) {
        res.sendStatus(404);
        return;
      }
    res.send(deletedApt);
  })
  .catch(err => {
      res.status(500).send(err);
  });
});

module.exports = router;
