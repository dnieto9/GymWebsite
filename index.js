var express = require('express');
var router = express.Router();
var {memberLogin} = require('./databaseFiles/login');
var {handleSignup} = require('./databaseFiles/signup'); 
var{getUserByEmail} = require('./databaseFiles/database');
var {getMembershipId,getCurrentGymId,getGymInfo,getLastPayment} = require('./databaseFiles/userFunctions');
const moment = require('moment'); // Ensure moment is required at the top of your file

var connection = require('./databaseFiles/database').databaseConnection;
var fs = require("fs");


//get home page 

router.get('/',async (req,res) =>{
    try {
        const query = `
            SELECT *
            FROM location;
        `;

        const result = await connection.query(query);
        const locations = result.rows;

        // Render the locations page with the locations data
        res.render('home', { locations });
    } catch (err) {
        console.error('Error fetching locations:', err.message);  // Log error message
        res.status(500).send('Error fetching locations.');
    }
})

router.get('/login', (req,res) =>{
    res.render('login',{ error: null });
})
router.post('/login', memberLogin);

router.get('/signup', async (req, res) => {
    try {
        const query = `
            SELECT 
                location_id, 
                CONCAT(location.street, ', ', location.city, ', ', location.state, ', ', location.zip) AS address
            FROM location;
        `;

        const result = await connection.query(query);
        const locations = result.rows;

        // Render the locations page with the locations data
        res.render('signup', { locations });
    } catch (err) {
        console.error('Error fetching locations:', err.message);  // Log error message
        res.status(500).send('Error fetching locations.');
    }
});


router.post('/signup', handleSignup);


router.get('/admin_login', (req,res) =>{

    res.render('admin_login',{error:null});
})



router.post('/admin_login', (req,res) =>{
    const {email, password} = req.body;
     // Check if the username and password match the hardcoded values
     if (email === 'admin@example.com' && password === 'pass123') {
        admin = true;
        // If the credentials are correct, redirect to the admin dashboard or home page
        req.session.user = {email,admin};
        res.redirect('/admin_page'); // You can change this to your admin dashboard route
    } else {
        // If the credentials are incorrect, show an error message
        res.render('admin_login', { error: 'Invalid username or password' });
    }

});


// Redirect /admin_page to /search with an empty query
router.get('/admin_page', (req, res) => {
    res.redirect('/search');
});


//reditect /manager-page with search-manager
router.get('/manager_page', (req, res) => {
    res.redirect('/search-manager');
});
router.get('/location_page', (req, res) => {
    res.redirect('/locations');
});

// Handle search functionality and initial load
router.get("/search-manager", async (req, res) => {
    const searchTerm = req.query.q || ""; // Get the search query
    try {
        let query;
        let values;

        if (searchTerm) {
            // If there's a search term, filter the results
            query = `
                SELECT * FROM manager 
                WHERE first_name ILIKE $1 
                OR last_name ILIKE $1
                OR manager_id::text ILIKE $1;
            `;
            values = [`%${searchTerm}%`];
        } else {
            // If no search term, get all manager
            query = "SELECT * FROM manager;";
            values = [];
        }

        // Execute the query
        const result = await connection.query(query, values);
        const managers = result.rows;

        // Render the admin page with members and the current search term
        res.render("manager_page", { managers, searchTerm });
    } catch (err) {
        console.error("Error searching managers:", err.stack);
        res.status(500).send("Error searching managers.");
    }
});

router.post('/add-manager', async (req, res) => {
    const { first_name, last_name, phone_number } = req.body;

    try {
        const query = `
            INSERT INTO manager (first_name, last_name, phone_number)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [first_name, last_name, phone_number];
        const result = await connection.query(query, values);

        console.log('New manager added:', result.rows[0]);

        // Redirect back to the manager page
        res.redirect('/manager_page');
    } catch (err) {
        console.error('Error adding manager:', err.stack);
        res.status(500).send('Error adding manager.');
    }
});
router.post('/deleteManager', async (req, res) => {
    const { manager_id } = req.body;

    try {
        const query = `
            DELETE FROM manager
            WHERE manager_id = $1
            RETURNING *;
        `;
        const values = [manager_id];
        const result = await connection.query(query, values);

        if (result.rowCount > 0) {
            console.log(`Manager with ID ${manager_id} deleted successfully.`);
            res.redirect('/manager_page'); // Redirect back to the manager page
        } else {
            console.log(`No manager found with ID ${manager_id}.`);
            res.status(404).send('Manager not found.');
        }
    } catch (err) {
        console.error('Error deleting manager:', err.stack);
        res.status(500).send('Error deleting manager.');
    }
});

router.get('/locations', async (req, res) => {
    try {
        const query = `
            SELECT 
                l.location_id, 
                CONCAT(l.street, ', ', l.city, ', ', l.state, ', ', l.zip) AS address,
                l.capacity, 
                CONCAT(m.first_name, ' ', m.last_name) AS manager_name,
                COUNT(DISTINCT c.user_id) AS checked_in_count  -- Count unique users with 'checked_in' status
            FROM location l
            LEFT JOIN manager m ON l.manager_id = m.manager_id
            LEFT JOIN checkin c ON l.location_id = c.location_id AND c.status = 'checked_in'  -- Only count checked-in users
            GROUP BY l.location_id, m.manager_id  -- Group by location and manager to get counts
            ORDER BY l.location_id;
        `;

        const result = await connection.query(query);
        const locations = result.rows;

        // Render the locations page with the locations data
        res.render('location_page', { locations });
    } catch (err) {
        console.error('Error fetching locations:', err.stack);
        res.status(500).send('Error fetching locations.');
    }
});


router.get("/search", async (req, res) => {
    const searchTerm = req.query.q || ""; // Get the search query
    try {
        let query;
        let values;

        if (searchTerm) {
            // If there's a search term, filter the results and include location_id from CheckIn table
            query = `
                SELECT DISTINCT ON (m.membership_id) 
                    m.*, 
                    c.location_id 
                FROM public.member m
                LEFT JOIN public.checkin c 
                ON m.membership_id = c.user_id 
                WHERE m.first_name ILIKE $1 
                OR m.last_name ILIKE $1
                OR m.membership_id::text ILIKE $1
                ORDER BY m.membership_id, c.checkin_time DESC;
            `;
            values = [`%${searchTerm}%`];
        } else {
            // If no search term, get all unique members and their location_id if applicable
            query = `
                SELECT DISTINCT ON (m.membership_id) 
                    m.*, 
                    c.location_id 
                FROM public.member m
                LEFT JOIN public.checkin c 
                ON m.membership_id = c.user_id
                ORDER BY m.membership_id, c.checkin_time DESC;
            `;
            values = [];
        }

        // Execute the query
        const result = await connection.query(query, values);
        const members = result.rows;

        // Render the admin page with members, their location_id, and the current search term
        res.render("admin_page", { members, searchTerm });
    } catch (err) {
        console.error("Error searching members:", err.stack);
        res.status(500).send("Error searching members.");
    }
});


router.post('/checkin', async (req, res) => {
    const { membership_id } = req.body;

    try {
        // Query to retrieve the latest location_id for the given membership_id
        const getLocationQuery = `
            SELECT location_id
            FROM CheckIn
            WHERE user_id = $1
            ORDER BY checkin_time DESC
            LIMIT 1;
        `;
        const locationResult = await connection.query(getLocationQuery, [membership_id]);
        
        // Use the retrieved location_id or handle cases where no location is found
        const location_id = locationResult.rows.length > 0 
        ? locationResult.rows[0].location_id 
        : null;

        // Insert the new check-in record
        const insertQuery = `
            INSERT INTO CheckIn (user_id, location_id)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const insertValues = [membership_id, location_id];
        const insertResult = await connection.query(insertQuery, insertValues);

        console.log('Check-in successful:', insertResult.rows[0]);
        res.redirect('/admin_page'); // Redirect to the desired page after successful check-in
    } catch (error) {
        console.error('Error checking in:', error);
        res.status(500).send('An error occurred while checking in.');
    }
});




router.get('/user_page', async (req, res) => {
    console.log('session on /user_page: ', req.session);

    if (!req.session.user) {
        console.log('no session user');
        return res.redirect('/login');
    }

    const email = req.session.user.email;

    try {
        // Fetch user details
        const user = await getUserByEmail(email);
        if (!user) {
            console.log('User not found');
            return res.redirect('/login');
        }

        // Get the membership ID
        const membership = await getMembershipId(email);
        if (!membership) {
            console.log('Membership not found for user');
            return res.redirect('/login');
        }

        // Get the current gym ID based on the last check-in
        const currentGymId = await getCurrentGymId(membership.membership_id);
        if (!currentGymId) {
            console.log('No check-in location found for user');
            return res.redirect('/login');
        }
        
        // Get gym information based on the gym ID
        const gymInfo = await getGymInfo(currentGymId.location_id);
        if (!gymInfo) {
            console.log('Gym info not found');
            return res.redirect('/login');
        }

        var gymManometer = 0;
        // Get the last payment details
        const lastPayment = await getLastPayment(membership.membership_id);
        if (!lastPayment) {
            console.log('No payment information found for user');
        }

        let gyms = [];
        try {
            const query = "SELECT * FROM man_o_meter();";
            const result = await connection.query(query);
            gyms = result.rows;

            // Find the gym with the currentGymId
            gymManometer = gyms.find(gym => gym.location_id === currentGymId.location_id)?.male_percentage || 0;

        } catch (err) {
            console.error("Error fetching gyms:", err.stack);
            res.status(500).send("Error fetching gyms.");
        }

        // Format the dates
        user.formatted_join_date = new Date(user.join_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        lastPayment.formatted_most_recent = new Date(lastPayment.most_recent_payment).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Ensure the most_recent_payment is a valid date string before parsing it
        const lastPaymentDate = moment(lastPayment.most_recent_payment, 'YYYY-MM-DD');
        
        if (!lastPaymentDate.isValid()) {
            console.error('Invalid last payment date:', lastPayment.most_recent_payment);
            return res.status(400).send('Invalid payment date.');
        }

        // Calculate next payment date (1 month from the last payment date)
        const nextPaymentDate = lastPaymentDate.add(1, 'months').format('YYYY-MM-DD');

        // Render the page with all the necessary information
        res.render('user_page', { 
            user, 
            gymInfo,
            lastPayment,
            gyms,
            gymManometer,
            nextPaymentDate // Pass the calculated next payment date
        });
    } catch (err) {
        console.error('Error in /user_page route:', err);
        res.status(500).send('An error occurred while processing your request.');
    }
});


router.post('/changeLocation', async (req, res) => {
    const { location_id } = req.body;
    const email = req.session.user?.email; // Retrieve the logged-in user's email

    if (!email || !location_id) {
        return res.status(400).send('User email or Location ID is missing!');
    }

    try {
        // Fetch Membership_ID (user_id) using email
        const userQuery = 'SELECT Membership_ID FROM Member WHERE Email = $1';
        const userResult = await connection.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return res.status(404).send('User not found!');
        }

        const user_id = userResult.rows[0].membership_id;

        // Insert new check-in record
        const checkInQuery = `
            INSERT INTO CheckIn (user_id, location_id, status)
            VALUES ($1, $2, 'checked_in')
        `;
        await connection.query(checkInQuery, [user_id, location_id]);

        // Reload the page to reflect the updated location
        return res.redirect('/user_page');
    } catch (err) {
        console.error('Error inserting check-in record:', err);
        res.status(500).send('Failed to change location.');
    }
});


//work on destroying user session
// // Logout route to destroy the session
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error during logout');
        }

        // Redirect to the login page after logout
        res.redirect('/login');
    });
});





module.exports = router;
