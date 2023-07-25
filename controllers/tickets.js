const Flight = require('../models/flight').Flight;
const Ticket = require('../models/ticket');

async function newTicket(req, res) {
  //Sort performers by their name
  try {
    const tickets = await Ticket.find({}).sort('seat');
    const flight = await Flight.findById(req.params.id);
    res.render('tickets/new', { title: 'Add Ticket', tickets, flight });
  } catch (err) { }
}

async function create(req, res) {
  try {
    req.body.flight = req.params.id;
    await Ticket.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/flights/${req.params.id}`);
}
  
  
  module.exports = {
    create,
    new: newTicket
  };