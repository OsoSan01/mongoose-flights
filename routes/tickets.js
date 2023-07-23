const express = require('express');
const router = express.Router({ mergeParams: true }); // Important: Merge params from parent route
const ticketsController = require('../controllers/tickets');

router.get('/new', ticketsController.new);
router.post('/', ticketsController.create);
router.delete('/:ticketId/delete', ticketsController.delete);

module.exports = router;