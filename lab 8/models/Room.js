const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    room_no: {
        type: String,
        required: true,
        unique: true,
        match: [/^[A-Z][0-9]{3}$/, "Room number must follow the format A101 (one uppercase letter followed by three digits)"]
    },

    room_type: {
        type: String,
        required: true,
        enum: ["Single", "Double", "Triple", "Four Sharing"]
    },

    capacity: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["Available", "Occupied", "Maintenance"],
        default: "Available"
    }
});

module.exports = mongoose.model("Room", roomSchema);