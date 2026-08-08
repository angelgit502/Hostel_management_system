const db = require("./config/db");
const roomRoutes = require("./api/rooms");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (with automatic .html extension resolution)
app.use(express.static(path.join(__dirname, "public"), {
    extensions: ["html", "htm"]
}));

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/api/rooms", roomRoutes);
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
