'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');

const Group = require('../controllers/groups.js');

const router = express.Router();

const groups = new Group();


router.get('/groups', (req, res) => {
  groups.getGroup()
    .then(group => {
      res.send(group);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/groups/:id', (req, res) => {
  const user_id = req.params.id;
  groups.getGroupById(user_id)
    .then(group => {
      if (!group || group.length === 0) {
         res.sendStatus(404);
         return;
      }
      res.send(group);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/groups', (req, res) => {
  const group = req.body;
    groups.addGroup(group)
    .then(group => {
      res.setHeader('Content-Type', 'application/json')
      return res.send(group[0]);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

router.delete('/groups/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(404);
  }

  groups.deleteGroup(id)
  .then(deletedGroup => {
    if (!deletedGroup[0]) {
        res.sendStatus(404);
        return;
      }
    res.send(deletedGroup);
  })
  .catch(err => {
      res.status(500).send(err);
  });
});

module.exports = router;
