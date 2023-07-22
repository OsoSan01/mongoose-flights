const Flight = require('../models/flight');


module.exports = {
  index,
  new: newFlight,
  create,
  show,
  addDestination,
  editFlight,
  updateFlight,
  deleteFlight,
};

async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { title: 'Your Flights', flights });
  }


function newFlight(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('flights/new', { errorMsg: '' });
}

async function create(req, res) {
  try {
    await Flight.create(req.body);
    // Always redirect after CRUDing data
    // We'll refactor to redirect to the movies index after we implement it
    res.redirect('/flights');  // Update this line
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}

async function show(req, res) {
  const flightId = req.params.flightId;

  try {
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).render('error', { error: 'Flight not found' });
    }

    res.render('flights/show', { flight });
  } catch (error) {
    res.status(500).render('error', { error: 'Internal Server Error' });
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

async function editFlight(req, res) {
  const flightId = req.params.flightId;

  try {
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).render('error', {
        message: 'Flight not found',
        error: { status: 404 },
      });
    }

    res.render('flights/edit', { flight }); // Make sure this line is correct
  } catch (error) {
    res.status(500).render('error', {
      message: 'Internal Server Error',
      error: { status: 500, stack: error.stack },
    });
  }
}

// Controller function to update a flight
async function updateFlight(req, res) {
  const flightId = req.params.flightId;
  const { airline, airport, flightNo, departs } = req.body;

  try {
    const flight = await Flight.findByIdAndUpdate(
      flightId,
      {
        airline,
        airport,
        flightNo,
        departs,
      },
      { new: true }
    );

    res.redirect(`/flights/${flight._id}`);
  } catch (error) {
    res.status(500).render('error', {
      message: 'Internal Server Error',
      error: { status: 500, stack: error.stack },
    });
  }
}

// Controller function to delete a flight
async function deleteFlight(req, res) {
  const flightId = req.params.flightId;

  try {
    // Find the flight and delete it from the database
    const flight = await Flight.findByIdAndRemove(flightId);
    
    if (!flight) {
      return res.status(404).render('error', {
        message: 'Flight not found',
        error: { status: 404 },
      });
    }

    res.redirect('/flights');
  } catch (error) {
    res.status(500).render('error', {
      message: 'Internal Server Error',
      error: { status: 500, stack: error.stack },
    });
  }
}