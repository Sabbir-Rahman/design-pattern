const mongoose = require("mongoose");

//this is for replicating required
const requiredString = {
  type: String,
  required: true,
};

const requiredUniqueString = {
  type: String,
  required: true,
  unique: true,
};

const messageSchema = mongoose.Schema({
  name: requiredString,
  message: Object
});

module.exports = mongoose.model("Message", messageSchema);
