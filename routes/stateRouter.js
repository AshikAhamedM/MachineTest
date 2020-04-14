const express = require('express');
const mysql = require('mysql');
const stateController = require('../controllers/stateController');

const router = express.Router();

router.param('id', stateController.checkID);

router
  .route('/')
  .get(stateController.getResults);

module.exports = router;