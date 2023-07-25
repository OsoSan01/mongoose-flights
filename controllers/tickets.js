const Flight = require('../models/flight').Flight;
const Ticket = require('../models/ticket');

async function create(req, res) {
    try {
      // Add the flight property to req.body before creating the ticket
      // req.body.flight = req.params.id;
      const flight = await Flight.findById(req.params.id)
      // Create the ticket
      await Ticket.create(req.body);
        await Ticket.save();
  
      // Redirect back to the flight's show view
      res.redirect(`/flights/${flight._id}`);
    } catch (err) {
      console.log(err);
      res.redirect('/flights/'); // Redirect to the flights index or handle the error appropriately
    }
  }

  function newTicket(req, res) {
  // Use the flight ID from req.params to get the flight information
  const flight = Flight.findById(req.params.id)
    res.render('tickets/new', { flight });
  };
  
  
  module.exports = {
    create,
    new: newTicket
  };