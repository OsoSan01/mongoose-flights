const { deleteOne } = require('../models/flight');
const Flight = require('../models/flight');

module.exports = {
  index,
  new: newFlight,
  create,
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
