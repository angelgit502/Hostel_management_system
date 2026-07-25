const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  room_no: {
    type: String,
    required: true,
    unique: true
  },
  room_type: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "Available"
  }
});

module.exports = mongoose.model("Room", roomSchema);