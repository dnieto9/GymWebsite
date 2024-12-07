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

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = "SELECT * FROM users WHERE email = $1 AND password = $2;";
        const values = [email, password];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.redirect("/user_page"); // Redirect on successful login
        } else {
            res.send("Invalid login credentials");
        }
    } catch (err) {
        console.error("Error during login:", err.stack);
        res.status(500).send("Error during login.");
    }
});

// User Page Route
app.get("/user_page", async (req, res) => {
    try {
        const query = "SELECT * FROM man_o_meter();";
        const result = await pool.query(query);
        const gyms = result.rows;

        res.render("user_page", { gyms }); // Render user page with gym data
    } catch (err) {
        console.error("Error fetching gyms:", err.stack);
        res.status(500).send("Error fetching gyms.");
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
