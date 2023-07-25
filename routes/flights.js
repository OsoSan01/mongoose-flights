const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flights');
const ticketsController = require('../controllers/tickets');
	
router.get('/', flightsController.index);

//router.get('./:id/tickets/new', ticketsController.new)

router.get('/new', flightsController.new);
router.get('/:id', flightsController.show);
router.post('/', flightsController.create);
router.post('/:id/destinations', flightsController.addDestination);






module.exports = router;
