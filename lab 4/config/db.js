const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/hostel_management")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log("MongoDB Connection Failed");
    console.log(err);
});

module.exports = mongoose;
