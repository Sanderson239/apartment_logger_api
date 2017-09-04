'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');

const Apartments_groups = require('../controllers/apartments_groups.js');

const router = express.Router();

const apartments_groups = new Apartments_groups();

router.get('/apartments_groups/:id', (req,res) => {
  let group_id = req.params.id;

  apartments_groups.getAllFavoritesByUserId(group_id)
    .then(apartment => {
      res.send(apartment);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  });

  module.exports = router;
