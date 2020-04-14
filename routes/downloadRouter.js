const express = require('express');
const mysql = require('mysql');
const stateController = require('../controllers/downloadController');

const router = express.Router();

router.param('id', downloadController.checkID);

router
  .route('/')
  .get(downloadController.getResults);

module.exports = router;