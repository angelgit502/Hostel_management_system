const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

/* ============================================================
   Room Management API (MongoDB + Mongoose)
   GET    /api/rooms          – List all rooms
   POST   /api/rooms          – Add new room
   GET    /api/rooms/:id      – Get single room
   PUT    /api/rooms/:id      – Update room
   DELETE /api/rooms/:id      – Delete room
   ============================================================ */

// ============================================================
// GET ALL ROOMS
// ============================================================
router.get("/", async (req, res) => {
    try {
        const rooms = await Room.find().sort({ room_no: 1 });
        res.json(rooms);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Failed to fetch rooms",
            details: err.message
        });
    }
});

// ============================================================
// ADD NEW ROOM
// ============================================================
router.post("/", async (req, res) => {

    try {

        const { room_no, room_type, capacity, status } = req.body;

        if (!room_no || !room_type || !capacity || !status) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        if (isNaN(capacity) || Number(capacity) < 1) {
            return res.status(400).json({
                error: "Capacity must be a positive number"
            });
        }

        const existingRoom = await Room.findOne({ room_no });

        if (existingRoom) {
            return res.status(409).json({
                error: `Room number "${room_no}" already exists`
            });
        }

        const room = new Room({
            room_no,
            room_type,
            capacity: Number(capacity),
            status
        });

        await room.save();

        res.status(201).json({
            success: true,
            message: "Room added successfully",
            room
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Database error",
            details: err.message
        });

    }

});

// ============================================================
// GET ROOM BY ID
// ============================================================
router.get("/:id", async (req, res) => {

    try {

        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                error: "Room not found"
            });
        }

        res.json(room);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Failed to fetch room",
            details: err.message
        });

    }

});

// ============================================================
// UPDATE ROOM
// ============================================================
router.put("/:id", async (req, res) => {

    try {

        const { room_no, room_type, capacity, status } = req.body;

        if (!room_no || !room_type || !capacity || !status) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        if (isNaN(capacity) || Number(capacity) < 1) {
            return res.status(400).json({
                error: "Capacity must be a positive number"
            });
        }

        const duplicate = await Room.findOne({
            room_no,
            _id: { $ne: req.params.id }
        });

        if (duplicate) {
            return res.status(409).json({
                error: "Room number already exists"
            });
        }

        const updatedRoom = await Room.findByIdAndUpdate(

            req.params.id,

            {
                room_no,
                room_type,
                capacity: Number(capacity),
                status
            },

            {
                new: true
            }

        );

        if (!updatedRoom) {
            return res.status(404).json({
                error: "Room not found"
            });
        }

        res.json({
            success: true,
            message: "Room updated successfully",
            room: updatedRoom
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Database error",
            details: err.message
        });

    }

});

// ============================================================
// DELETE ROOM
// ============================================================
router.delete("/:id", async (req, res) => {

    try {

        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                error: "Room not found"
            });
        }

        if (room.status === "Occupied") {
            return res.status(400).json({
                error: "Cannot delete an occupied room."
            });
        }

        if (room.status === "Maintenance") {
            return res.status(400).json({
                error: "Cannot delete a room under maintenance."
            });
        }

        await Room.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Room deleted successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Database error",
            details: err.message
        });

    }

});

module.exports = router;