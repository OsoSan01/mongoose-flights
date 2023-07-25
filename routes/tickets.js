const express = require('express');
const router = express.Router({ mergeParams: true }); // Important: Merge params from parent route
const ticketsController = require('../controllers/tickets');

router.post('/flights/:id/tickets', ticketsController.create);
router.get('/flights/:id/tickets/new', ticketsController.new);


module.exports = router;