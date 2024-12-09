const express = require('express');
var client = require('./database').databaseConnection;



//function to get users req.session.user.email;
//take holds the email find everything with email, //in database file
//get current gym (find gym with session email)
//change current gym location (takes in email from session so only need gym id)
//show last payment (in session.user = emails)
//insert payment 

//get users id 
async function getMembershipId(email) {
    const sql = "SELECT membership_id FROM member WHERE email = $1";
    try {
        const results = await client.query(sql, [email]);
        return results.rows.length > 0 ? results.rows[0] : null;
    } catch (err) {
        console.error('Error in getMembershipId:', err);
        throw err;
    }
}

async function getCurrentGymId(userId) {
    const sql = "SELECT location_id FROM checkin WHERE user_id = $1 ORDER BY checkin_id DESC LIMIT 1"; // Ordering by checkin_id DESC to get the latest check-in
    try {
        const results = await client.query(sql, [userId]);
        return results.rows.length > 0 ? results.rows[0] : null;
    } catch (err) {
        console.error('Error in getCurrentGymId:', err);
        throw err;
    }
}


async function getGymInfo(locationId) {
    const sql = "SELECT * FROM location WHERE location_id = $1";
    try {
        const results = await client.query(sql, [locationId]);
        return results.rows.length > 0 ? results.rows[0] : null;
    } catch (err) {
        console.error('Error in getGymInfo:', err);
        throw err;
    }
}

async function getLastPayment(memberId) {
    const sql = `
        SELECT Payment_ID, Most_recent_payment, Membership_status
        FROM Payment
        WHERE Member_ID = $1
        ORDER BY Most_recent_payment DESC
        LIMIT 1;
    `;
    try {
        const results = await client.query(sql, [memberId]);
        return results.rows.length > 0 ? results.rows[0] : null;
    } catch (err) {
        console.error('Error in getLastPayment:', err);
        throw err;
    }
}

//checkin will keep the new locations as a log, if u get the latest location will tell u current registration 
//for every insert


async function insertNewCheckin(userId, newLocationId) {
    const sql = `
        INSERT INTO checkin (user_id, location_id, checkin_time)
        VALUES ($1, $2, NOW())
        RETURNING checkin_id, location_id, checkin_time;
    `;
    try {
        const results = await client.query(sql, [userId, newLocationId]);
        return results.rows[0]; // Return the new check-in details
    } catch (err) {
        console.error('Error in insertNewCheckin:', err);
        throw err;
    }
}

//have a button and we will have their credit card information stored so it will automatically insert into for now.
async function insertNewPayment(memberId, paymentDate, membershipStatus) {
    const sql = `
        INSERT INTO Payment (Member_ID, Most_recent_payment, Membership_status)
        VALUES ($1, $2, $3)
        RETURNING Payment_ID, Member_ID, Most_recent_payment, Membership_status;
    `;
    try {
        const results = await client.query(sql, [memberId, paymentDate, membershipStatus]);
        return results.rows[0]; // Return the new payment details
    } catch (err) {
        console.error('Error in insertNewPayment:', err);
        throw err;
    }
}






module.exports = { getMembershipId,getCurrentGymId,getGymInfo ,getLastPayment,
insertNewCheckin,insertNewPayment};