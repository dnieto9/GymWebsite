const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 8000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

// Serve Admin Login Page
app.get("/admin_login", (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/admin_login.ejs'));
});

// Handle Admin Login POST request
app.post("/admin_login", (req, res) => {
    const { username, password } = req.body;

    // Simple admin login validation
    if (username === "admin" && password === "admin123") {
        res.send("Welcome, Admin!");
    } else {
        res.send("Invalid credentials, please try again.");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
