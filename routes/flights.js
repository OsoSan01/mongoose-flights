const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const flightsController = require('../controllers/flights');
	
// GET /flights
router.get('/', flightsController.index);
// GET /flights/new
router.get('/new', flightsController.new);
// POST /flights
router.post('/', flightsController.create);

// NEW ROUTE: GET /flights/:flightId
router.get('/:flightId', flightsController.show);

// NEW ROUTE: POST /flights/:flightId/destinations
router.post('/:flightId/destinations', flightsController.addDestination)

// NEW ROUTE: GET /flights/:flightId/edit
router.get('/:flightId/edit', flightsController.editFlight);

// NEW ROUTE: PUT /flights/:flightId
router.put('/:flightId', flightsController.updateFlight);

// NEW ROUTE: DELETE /flights/:flightId
router.delete('/:flightId/DELETE', flightsController.deleteFlight);



	
module.exports = router;
