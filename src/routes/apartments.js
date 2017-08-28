'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');
const gmsApiKey = process.env.GMS_API_KEY;

const Apartment = require('../controllers/apartments.js');

const router = express.Router();

const apartments = new Apartment();

router.get('/apartments', (req, res) => {
  apartments.getApartment()
    .then(apartment => {
      res.send(apartment);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/apartments/:id', (req, res) => {
  const id = req.params.id;
  apartments.getApartmentById(id)
    .then(apt => {
      if (!apt || apt.length === 0) {
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

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${apt.street}+${apt.city}+${apt.state}+${apt.country}&key=${gmsApiKey}`)
  .then(response => {
    return response.json()
  })
  .then(data => {
    if ((data.results.length !== 1) && (!apt.latitude || !apt.longitude)) {
      apt.latitude = null;
      apt.longitude = null;
    };
    if ((!apt.latitude || !apt.longitude) && (apt.latitude !== null || apt.longitude !== null)) {
      apt.latitude = data.results[0].geometry.location.lat;
      apt.longitude = data.results[0].geometry.location.lng;
    }
    apartments.addApartment(apt)
    .then(apt => {
      res.setHeader('Content-Type', 'application/json')
      return res.send(apt[0]);
    })
    .catch(err => {
      res.sendStatus(500);
    });
  });
})

router.delete('/apartments/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(404);
  }

  apartments.deleteApartment(id)
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
