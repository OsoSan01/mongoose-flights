const Flight = require('../models/flight').Flight;
const Ticket = require('../models/ticket');


module.exports = {
  index,
  new: newFlight,
  create,
  show,
  addDestination,
};

async function index(req, res) {
  try {
    // Populate the 'tickets' property for each flight
    const flights = await Flight.find({});

    res.render('flights/index', { title: 'Your Flights', flights });
  } catch (err) {
    console.log(err);
    res.render('error', {
      message: 'Internal Server Error',
      error: { status: 500, stack: err.stack },
    });
  }
}

function newFlight(req, res) {
  res.render('flights/new', { errorMsg: '' });
}

async function create(req, res) {
  try {
    
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/flights');
  }
}

async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    console.log(flight)
    // Query the tickets that belong to the flight using the flight's _id
    const tickets = await Ticket.find({ flight: flight._id });

    res.render('flights/show', { flight, tickets });
  } catch (err) {
    console.log(err);
    res.redirect('/flights'); // Redirect to the flights index or handle the error appropriately
  }
}


async function addDestination(req, res) {
  const flightId = req.params.flightId;
  const { airport, arrival } = req.body;
  try {
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).render('error', {
        message: 'Flight not found',
        error: { status: 404 },
      });
    }

    const newDestination = {
      airport,
      arrival: new Date(arrival),
    };
    flight.destinations.push(newDestination);
    await flight.save();
    res.redirect(`/flights/${flightId}`);
  } catch (error) {
    res.status(500).render('error', {
      message: 'Internal Server Error',
      error: { status: 500, stack: error.stack },
    });
  }
}