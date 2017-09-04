'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');

const Apartments_groups = require('../controllers/apartments_groups.js');

const router = express.Router();

const apartments_groups = new Apartments_groups();

router.get('/apartments_groups/:id', (req,res) => {
  let group_id = req.params.id;

  apartments_groups.getAllapartmentGroupsByUserId(group_id)
    .then(apartment => {
      res.send(apartment);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  });

  router.post('/apartments_groups', (req, res) => {
  const newApartmentsGroups = req.body;

  if (!newApartmentsGroups.apartment_id) {
    return res.status(400)
      .set('Content-Type', 'text/plain')
      .send('Coffee required');
  }

  if (!newApartmentsGroups.user_id) {
    return res.status(400)
      .set('Content-Type', 'text/plain')
      .send('User ID required');
  }

  apartments_groups.addApartmentsGroups(newApartmentsGroups)
  .then(newApartmentsGroups => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(newApartmentsGroups[0]);
  })
    .catch(err => {
      res.sendStatus(500);
    });
});

router.delete('/apartments_groups/:id', (req,res) => {
  let apartments_groups_id = req.params.id;

  apartments_groups.deleteApartmentsGroups(apartments_groups_id)
    .then(partments_groups => {
      res.send(partments_groups);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  });

  module.exports = router;
