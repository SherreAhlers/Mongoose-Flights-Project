const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');
const flights = require('../controllers/flights.js');

/* GET users listing. */
router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new);
router.post('/', flightsCtrl.create)


module.exports = router;