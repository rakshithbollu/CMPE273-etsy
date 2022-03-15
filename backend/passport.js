"use strict";
const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt  = require('passport-jwt').ExtractJwt;
const passport = require('passport');
var {secret} = require('./config');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'etsy',
    port: '3306',
    user: 'root',
    password: 'password'
});


connection.connect((err) => {
    if(err){
        throw 'Error occured ' + err;
    }
    console.log("pool created");
});


function auth()
{
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
passport.use (new JwtStrategy(opts,(jwt_payload,callback) => {
    const email = jwt_payload.email
    connection.query(`SELECT * FROM users WHERE email=?`,[email
    ],  function(error,results){
        if(error){
            console.log("Invalid user from server");
            return callback(error,false)
        }
        if(results.length !== 0){
            console.log("Valid user");
            callback(null,results);}
            else {
                console.log("InValid user");
                callback(null,results);}
});
}))
}


exports.auth = auth;
exports.checkAuth =passport.authenticate("jwt",{session :false});
