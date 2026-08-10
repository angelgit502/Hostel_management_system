const express = require("express");
const router = express.Router();

const Room = require("../models/Room");


// Capacity map for room types
const capacityMap = {
    "Single": 1,
    "Double": 2,
    "Triple": 3,
    "Four Sharing": 4
};


// CREATE - Add a new room
router.post("/", async (req, res) => {
    try {
        const { room_no, room_type, capacity } = req.body;

        // Validate room number format
        if (!room_no || !/^[A-Z][0-9]{3}$/.test(room_no)) {
            return res.status(400).json({
                message: "Room number must follow the format A101 (one uppercase letter followed by three digits)"
            });
        }

        // Validate room type
        if (!capacityMap[room_type]) {
            return res.status(400).json({
                message: "Invalid room type. Must be Single, Double, Triple, or Four Sharing"
            });
        }

        // Validate capacity matches room type
        if (capacity !== capacityMap[room_type]) {
            return res.status(400).json({
                message: `Capacity must be ${capacityMap[room_type]} for ${room_type} room`
            });
        }

        // Check for duplicate room number
        const existingRoom = await Room.findOne({ room_no });
        if (existingRoom) {
            return res.status(400).json({
                message: "Room number already exists"
            });
        }

        const room = await Room.create(req.body);

        res.status(201).json({
            message: "Room added successfully",
            room: room
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Room number already exists"
            });
        }
        res.status(400).json({
            message: "Failed to create room",
            error: error.message
        });
    }
});


// READ - Get all rooms
router.get("/", async (req, res) => {
    try {
        const rooms = await Room.find();

        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch rooms",
            error: error.message
        });
    }
});


// READ - Get one room
router.get("/:id", async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({
            message: "Invalid room ID",
            error: error.message
        });
    }
});


// UPDATE - Update a room
router.put("/:id", async (req, res) => {
    try {
        const { room_no, room_type, capacity } = req.body;

        // Validate room number format if provided
        if (room_no && !/^[A-Z][0-9]{3}$/.test(room_no)) {
            return res.status(400).json({
                message: "Room number must follow the format A101 (one uppercase letter followed by three digits)"
            });
        }

        // Validate capacity matches room type if both provided
        if (room_type && capacity !== undefined) {
            if (capacityMap[room_type] && capacity !== capacityMap[room_type]) {
                return res.status(400).json({
                    message: `Capacity must be ${capacityMap[room_type]} for ${room_type} room`
                });
            }
        }

        // Check for duplicate room number (excluding current room)
        if (room_no) {
            const existingRoom = await Room.findOne({ room_no, _id: { $ne: req.params.id } });
            if (existingRoom) {
                return res.status(400).json({
                    message: "Room number already exists"
                });
            }
        }

        const room = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        res.status(200).json({
            message: "Room updated successfully",
            room: room
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Room number already exists"
            });
        }
        res.status(400).json({
            message: "Failed to update room",
            error: error.message
        });
    }
});


// DELETE - Delete a room
router.delete("/:id", async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        // Only allow deletion if status is Available
        if (room.status !== "Available") {
            return res.status(400).json({
                message: "Room cannot be deleted unless it is Available"
            });
        }

        await Room.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Room deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete room",
            error: error.message
        });
    }
});


module.exports = router;