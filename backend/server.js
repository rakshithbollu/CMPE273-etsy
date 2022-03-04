const app = require("./app");
const dotenv = require("dotenv");
var connection = require('./config/database');

// Config
dotenv.config({ path: "backend/config/config.env" });

// Connecting to database
 app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
      connection.connect(function(err){
        if(err) throw err;
        console.log('Database connected!');

})});



