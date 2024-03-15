const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema({
  barber_name: {
    type: String,
    enum: ['JOHN_DOE', 'JANE_DAWN', 'WILLIAM_WILLIAMS'], // Allowed values for BarberEnum
    required: true,
  },
  date: {
    type: Date,
    required: true, // selected from the calendar
  },
  time: {
    type: String,
    required: true, // selected from the time slot thing
  },
  service: {
    type: String,
    enum: ['FADE', 'CUT', 'SHAVE'], // Allowed values for ServiceEnum
    required: true,
  },
});

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;