const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./database");
const path = require("path");

const app = express();
const port = 9000;

// Middleware to serve static files (like images and CSS)
app.use(express.static(path.join(__dirname, 'public')));  // Serve static assets from the 'public' folder
app.use(bodyParser.urlencoded({ extended: false }));

// Set EJS as the template engine (if you're still using it for other pages)
app.set("view engine", "ejs");

// Serve the form
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/home.html");
});

// Serve the Login Page
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/pages/login.html");
});

// Serve the Registration Form
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/pages/form.html");
});

// Serve the Admin Login Page
app.get("/admin_login", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/admin_login.html"));
});

// Handle the Admin Login POST request
app.post("/admin_login", (req, res) => {
    // Redirect to the admin page without validation for now
    res.redirect("/admin_page");
});

// Serve the Admin Page
app.get("/admin_page", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/admin_page.html"));
});

// Search for members in the database
app.get("/search", async (req, res) => {
    const searchTerm = req.query.q || "";  // Get the search query
    try {
        const query = `
            SELECT * FROM public.member 
            WHERE first_name ILIKE $1 
            OR last_name ILIKE $1
            OR membership_id::text ILIKE $1;
        `;
        const values = [`%${searchTerm}%`];
        const result = await pool.query(query, values);
        const members = result.rows;

        res.render("admin_page", { members, searchTerm });
    } catch (err) {
        console.error("Error searching members:", err.stack);
        res.status(500).send("Error searching members.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
