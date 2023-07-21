const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;



const flightSchema = new Schema({
    airline: { 
      type: String,
      enum: ['American', 'Southwest', 'United', 'Quantas', 'Aeromexico', 'Dubai'],
      required: true
  },
    airport: { 
      type: String,
      enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'MXN', 'DXB'],
      default: 'AUS',
      required: true
  },
    flightNo: {
      type: Number,
      min: 10, max: 9999,
      required: true
  },
    departs: { 
      type: Date,
      default: function () {
        const flightDate = new Date();
        flightDate.setFullYear(flightDate.getFullYear() +1);
        return flightDate;
      },
      book: {
        type: Boolean,
        default: false
      }
  }
  });


module.exports = mongoose.model('Flight', flightSchema);

