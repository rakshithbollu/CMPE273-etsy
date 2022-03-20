const express = require('express');
const session = require('express-session');
const app = express();
var mysql = require('mysql');
//const passport    = require('passport');
var cors = require('cors');
//var constraints = require("./config.json");
var multer =require('multer');
app.use(cors());
//require('../Utils/passport');
//app.get('/',(req,res) => res.send('API Running'));

app.use(session({
     secret: 'mysql',
     resave: false,
     saveUninitialized: false,
     duration: 60 * 60 * 1000,
     activeDuration: 5 * 60 * 1000
 }));
 

/*
var connection = mysql.createPool({
    host: constraints.DB.host,
    user:constraints.DB.username,
    password: constraints.DB.password,
    port: constraints.DB.port,
    database: constraints.DB.database
});
*/
var connection = mysql.createConnection({
    host: 'etsy.cewwaa2uc0yy.us-east-2.rds.amazonaws.com',
    database: 'etsy',
    port: '3306',
    user: 'admin',
    password: 'password'
});

connection.connect((err) => {
    if(err){
        throw 'Error occured ' + err.message;
    }
    console.log("pool created");
});

app.get('/test_api',async function(req,res){
    await connection.query('SELECT * from users', async function(error,results){
        if(error){
            res.writeHead(200, {
                'Content-Type': 'text-plain'
            });
            res.send(error.code);
        }else{
            res.writeHead(200,{
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(results));
        }
    });
});
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/shopname', require('./routes/api/shopname'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));