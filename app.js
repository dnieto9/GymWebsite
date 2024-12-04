const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 8000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

<<<<<<< HEAD
// Serve Admin Login Page
app.get("/admin_login", (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/admin_login.ejs'));
=======
app.get("/",(req,res) => {
    res.sendFile(__dirname + "/pages/home.html");
});
app.get("/Login",(req,res) => {
    res.sendFile(__dirname + "/pages/login.html");
});

app.get("/SignUp",(req,res) => {
    res.sendFile(__dirname + "/pages/form.html");
>>>>>>> 0072a18eccdfa4b83aacdbfd2860646009387c9d
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
