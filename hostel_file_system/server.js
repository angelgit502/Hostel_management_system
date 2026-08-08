const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const dataFolder = path.join(__dirname, "data");

// GET - List all files
app.get("/files", (req, res) => {
    fs.readdir(dataFolder, (err, files) => {
        if (err) {
            return res.status(500).json({
                error: "Unable to read data folder"
            });
        }

        res.json(files);
    });
});

// GET - Read a particular file
app.get("/files/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(dataFolder, filename);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(404).json({
                error: "File not found"
            });
        }

        res.send(data);
    });
});

// POST - Create a new file
app.post("/files", (req, res) => {
    const { filename, content } = req.body;

    console.log("POST request received:", filename);

    if (!filename) {
        return res.status(400).json({
            error: "Filename is required"
        });
    }

    const filePath = path.join(dataFolder, filename);

    fs.writeFile(filePath, content || "", (err) => {
        if (err) {
            console.log("File creation error:", err);

            return res.status(500).json({
                error: "Unable to create file"
            });
        }

        console.log("File created:", filename);

        res.json({
            message: "File created successfully",
            filename: filename
        });
    });
});
// POST - Append content to an existing file
app.post("/files/append", (req, res) => {
    const { filename, content } = req.body;

    if (!filename) {
        return res.status(400).json({
            error: "Filename is required"
        });
    }

    const filePath = path.join(dataFolder, filename);

    fs.appendFile(filePath, content || "", (err) => {
        if (err) {
            return res.status(500).json({
                error: "Unable to append to file"
            });
        }

        console.log("Content appended to:", filename);

        res.json({
            message: "Content appended successfully",
            filename: filename
        });
    });
});

// PUT - Modify an existing file
app.put("/files/:filename", (req, res) => {
    const filename = req.params.filename;
    const { content } = req.body;

    const filePath = path.join(dataFolder, filename);

    fs.writeFile(filePath, content || "", (err) => {
        if (err) {
            return res.status(500).json({
                error: "Unable to modify file"
            });
        }

        console.log("File modified:", filename);

        res.json({
            message: "File modified successfully",
            filename: filename
        });
    });
});
//  delete file
app.delete("/files/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(dataFolder, filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).json({
                error: "File not found"
            });
        }

        console.log("File deleted:", filename);

        res.json({
            message: "File deleted successfully",
            filename: filename
        });
    });
});
app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});