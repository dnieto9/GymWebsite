var { Client } = require("pg");
require('dotenv').config();

var client = new Client({
    connectionString: process.env.DATABASE_URL,
});


client.connect((err => {
    if(err) throw err;
    console.log('Postgres Connected Succesfully');
}));


function userExists(email, callback){
    let sql = "SELECT * FROM member WHERE email = $1";
    client.query(sql, [email],(err,results) => {
        if(err){
            return callback(err);

        }
        callback(null, results.rows.length>0);
    });
}

function passwordCheck(email,password, callback){
    let sql = "SELECT * FROM member WHERE email = $1 and password = $2";
    client.query(sql, [email,password], (err,results) =>{
        if(err){
            console.log('database.js');
            return callback(err);
        }
        callback(null, results.rows.length>0);
    });
}


async function getUserByEmail(email) {
    const sql = "SELECT * FROM member WHERE email = $1";
    try {
        const results = await client.query(sql, [email]);
        return results.rows.length > 0 ? results.rows[0] : null;
    } catch (err) {
        console.error('Error in getUserByEmail:', err);
        throw err;
    }
}




//insert user --> insert a new user into the database
//etc...

module.exports = {userExists,passwordCheck,getUserByEmail,
    databaseConnection : client
};
