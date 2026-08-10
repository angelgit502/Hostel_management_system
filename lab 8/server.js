const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const app = express();


// Connect MongoDB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());


// Serve frontend
app.use(express.static(path.join(__dirname, "public")));


// REST API
app.use("/api/rooms", require("./routes/roomRoutes"));


// Start server
const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});