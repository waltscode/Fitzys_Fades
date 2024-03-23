const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'Must match an email address!'],
  },
  message: {
    type: String,
    required: true,

  },
});


const Message = model("Message", messageSchema);

module.exports = Message;
