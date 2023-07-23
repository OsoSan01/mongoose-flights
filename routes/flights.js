const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flights');
const ticketsController = require('../controllers/tickets');
	
router.get('/', flightsController.index);
router.get('/new', flightsController.new);
router.get('/:id', flightsController.show);
router.post('/', flightsController.create);

router.post('/:flightId/destinations', flightsController.addDestination);
router.post('/:id/tickets', ticketsController.create);





module.exports = router;
