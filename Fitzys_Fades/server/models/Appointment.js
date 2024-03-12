const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema({
  barber_name: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  date: {
    type: String, //to account for special characters
    required: true,
  },
  time: {
    type: String, //to account for special characters
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
});

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;
