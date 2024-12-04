var express = require('express');
var router = express.Router();
var {memberLogin} = require('./databaseFiles/login');
var {handleSignup} = require('./databaseFiles/signup'); 
var{getUserByEmail} = require('./databaseFiles/database');
var {getMembershipId,getCurrentGymId,getGymInfo,getLastPayment} = require('./databaseFiles/userFunctions');

var connection = require('./databaseFiles/database').databaseConnection;
var fs = require("fs");


//get home page 

router.get('/', (req,res) =>{
    res.render('home');
})

router.get('/login', (req,res) =>{
    res.render('login',{ error: null });
})
router.post('/login', memberLogin);

router.get('/signup', (req,res) =>{
    res.render('signup',{ error: null });
})
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

// Handle search functionality and initial load
router.get("/search", async (req, res) => {
    const searchTerm = req.query.q || ""; // Get the search query
    try {
        let query;
        let values;

        if (searchTerm) {
            // If there's a search term, filter the results
            query = `
                SELECT * FROM public.member 
                WHERE first_name ILIKE $1 
                OR last_name ILIKE $1
                OR membership_id::text ILIKE $1;
            `;
            values = [`%${searchTerm}%`];
        } else {
            // If no search term, get all members
            query = "SELECT * FROM public.member;";
            values = [];
        }

        // Execute the query
        const result = await connection.query(query, values);
        const members = result.rows;

        // Render the admin page with members and the current search term
        res.render("admin_page", { members, searchTerm });
    } catch (err) {
        console.error("Error searching members:", err.stack);
        res.status(500).send("Error searching members.");
    }
});

router.get('/payhistory', async (req, res) => {
    console.log('session on /payhistory: ', req.session);

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

        // Get the last payment details
        const lastPayment = await getLastPayment(membership.membership_id);
        if (!lastPayment) {
        console.log('No payment information found for user');
        }



        // Render the page with all the necessary information
        res.render('payhistory', { user, gymInfo,lastPayment});
    } catch (err) {
        console.error('Error in /payhistory route:', err);
        res.status(500).send('An error occurred while processing your request.');
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
