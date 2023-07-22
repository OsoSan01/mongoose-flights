const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  airport: {
    type: String,
    required: true,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'MXN', 'DXB'],
  },
  arrival: {
    type: Date,
    required: true,
  },
});

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United', 'Quantas', 'Aeromexico', 'Dubai'],
    required: true,
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'MXN', 'DXB'],
    default: 'AUS',
    required: true,
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    required: true,
  },
  departs: {
    type: Date,
    default: function () {
      const flightDate = new Date();
      flightDate.setFullYear(flightDate.getFullYear() + 1);
      return flightDate;
    },
  },
  destinations: {
    type: [destinationSchema], // Array of destination subdocuments
    default: [],
  },
});


const Flight = mongoose.model('Flight', flightSchema);
const Destination = mongoose.model('Destination', destinationSchema);

module.exports = mongoose.model('Flight', flightSchema);