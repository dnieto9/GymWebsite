const express = require("express");
//const{functionname1, functionname2} = require('./database')
var connection = require('./database').databaseConnection; //that is importing the client


function handleSignup(req, res) {
    const {
        first_name,
        last_name,
        gender,
        dob,
        join_date,
        email,
        phone_number,
        street,
        city,
        state,
        zip,
        password,
        location_choice // Location ID from the dropdown
    } = req.body;

    // Validate required fields
    if (
        !first_name || !last_name || !gender || !dob || !join_date ||
        !email || !phone_number || !street || !city || !state || !zip || 
        !password || !location_choice
    ) {
        return res.status(400).send('All fields are required!');
    }

    // SQL query to insert the new member into the Member table
    const insertMemberQuery = `
        INSERT INTO Member (
            First_name, Last_name, Gender, DOB, 
            Join_date, Payment_status, Email, Phone_number, 
            Street, City, State, Zip, password,membership_type
        ) 
        VALUES (
            $1, $2, $3, $4, 
            $5, TRUE, $6, $7, 
            $8, $9, $10, $11, $12, 1
        ) RETURNING Membership_ID
    `;

    // Data to insert for the Member table
    const memberValues = [
        first_name,
        last_name,
        gender,
        dob,
        join_date,
        email,
        phone_number,
        street,
        city,
        state,
        zip,
        password,

    ];

    // Insert the member and retrieve the Membership_ID
    connection.query(insertMemberQuery, memberValues)
        .then((memberResult) => {
            const userId = memberResult.rows[0].membership_id;

            // SQL query to insert the payment record
            const insertPaymentQuery = `
                INSERT INTO Payment (
                    Member_ID, Most_recent_payment, Membership_status
                )
                VALUES ($1, CURRENT_DATE, 'Active')
            `;

            const paymentValues = [userId];

            // Insert the payment record
            return connection.query(insertPaymentQuery, paymentValues)
                .then(() => {
                    // SQL query to insert the check-in entry
                    const insertCheckinQuery = `
                        INSERT INTO CheckIn (
                            user_id, location_id
                        ) 
                        VALUES ($1, $2)
                    `;

                    const checkinValues = [userId, location_choice];

                    // Insert the check-in entry
                    return connection.query(insertCheckinQuery, checkinValues)
                        .then(() => {
                            // Set the session and redirect to the user page
                            req.session.user = { email, admin: false };
                            return res.redirect("/user_page");
                        });
                });
        })
        .catch((err) => {
            console.error('Error during signup or payment/check-in:', err);
            return res.status(500).send('Error registering member!');
        });
}







module.exports = {handleSignup}; //any functions made here for the html pages go here
