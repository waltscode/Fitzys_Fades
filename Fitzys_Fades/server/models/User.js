const { Schema, model } = require("mongoose");
const Appointment = require("./Appointment");

const userSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,  //to account for special characters
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  appointment: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
  },
});

const User = model("User", userSchema);

module.exports = User;
