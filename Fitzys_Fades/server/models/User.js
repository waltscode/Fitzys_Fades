const { Schema, model } = require("mongoose");
const Appointment = require("./Appointment");
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
    role: {
    type: String,
    default: 'user', 
    enum: ['user', 'admin'] 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'Must match an email address!'],
  },
  phone: {
    type: String,  //to account for special characters
    required: true,
    unique: false,
    match: [/^(\d{3}[-.]\d{3}[-.]\d{4})|(\d{10})$/, 'Must match a phone number!'],
  },
  password: {
    type: String,
    required: true,

  },
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: "Appointment",
  }],
});

// add hooks for the password encryption
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});
// method to un-encrypt while checking the password for confirmation
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
