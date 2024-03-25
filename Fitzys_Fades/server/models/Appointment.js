const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema({
  barber_name: {
    type: String,
    enum: ['JOHN_DOE', 'JANE_DAWN', 'WILLIAM_WILLIAMS'], // Allowed values for BarberEnum
    required: true,
  },
  date: {
    type: String,
    required: true, // selected from the calendar
  },
  time: {
    type: String,
    required: true, // selected from the time slot thing
  },
  service: {
    type: String,
    required: true,
  },
  user: { // was missing from the original snippet
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }
});

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;