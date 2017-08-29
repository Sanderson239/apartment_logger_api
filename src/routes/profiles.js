'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');

const Profile = require('../controllers/profiles.js');

const router = express.Router();

const profiles = new Profile();


router.get('/profiles', (req, res) => {
  profiles.getProfile()
    .then(profile => {
      res.send(profile);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/profiles/:id', (req, res) => {
  const id = req.params.id;
  profiles.getProfileById(id)
    .then(profile => {
      if (!profile || profile.length === 0) {
         res.sendStatus(404);
         return;
      }
      res.send(profile);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/profiles', (req, res) => {
  const profile = req.body;
    profiles.addProfile(profile)
    .then(profile => {
      res.setHeader('Content-Type', 'application/json')
      return res.send(profile[0]);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

router.delete('/profiles/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(404);
  }

  profiles.deleteProfile(id)
  .then(deletedProfile => {
    if (!deletedProfile[0]) {
        res.sendStatus(404);
        return;
      }
    res.send(deletedProfile);
  })
  .catch(err => {
      res.status(500).send(err);
  });
});

module.exports = router;
