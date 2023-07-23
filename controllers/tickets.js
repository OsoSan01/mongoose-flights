const Flight = require('../models/flight');
const Ticket = require('../models/flight');

async function create(req, res) {
    try {
      // Add the flight property to req.body before creating the ticket
      req.body.flight = req.params.id;
  
      // Create the ticket
      await Ticket.create(req.body);
  
      // Redirect back to the flight's show view
      res.redirect(`/flights/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.redirect('/flights'); // Redirect to the flights index or handle the error appropriately
    }
  }
  
  module.exports = {
    create,
  };