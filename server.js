//ADD DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.js');
// const db = require('./db/index')


//GLOBAL VARIABLES
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

// CORS SECURITY CONFIGURATIONS
const whitelist = ["http://localhost:3000/", "https://project-2-backend.herokuapp.com/", "https://hiraldokai-management.netlify.app/"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(
        new Error("Not allowed by CORS, domain needs to be added to whitelist")
      );
    }
  },
};



//MIDDLEWARE
NODE_ENV === "development" ? app.use(cors()) : app.use(cors(corsOptions));
app.use(express.json()); 
app.use(morgan("dev")); 
app.use(express.static("public"));


//ROUTES
// app.use((req, res, next) => {  res.header('Access-Control-Allow-Origin', '*');  next();});
app.use('/',routes);

//used to test on heroku but failed
app.get('/', (req,res) => {
  res.send('routes working');
})


//LISTENERR
app.listen(PORT, () => {
    console.log("APP is running on PORT: " + PORT);
})

// //DEPENDENCIES
// require("dotenv").config(); 
// const express = require("express"); 
// const app = express(); 
// const morgan = require("morgan"); 
// const cors = require("cors"); 
// const mongoose = require("mongoose"); 
// const routes = require('./routes/index')

// //GlOBAL VARIABLES

// const PORT = process.env.PORT; 
// const NODE_ENV = process.env.NODE_ENV; 
// const mongoURI = process.env.MONGODB_URI;
// const db = mongoose.connection; 
// const mongoConfigObject = { useNewUrlParser: true, useUnifiedTopology: true }; 

// //CONNECT TO DATABASE
// // Code for connecting to our mongo database
// mongoose.connect(mongoURI, mongoConfigObject, () => {
//   console.log("CONNECTED TO MONGO");
// });

// //CONNECTION MESSAGING
// //Building in messages so we know when our database connection changes
// db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
// db.on("connected", () => console.log("mongo connected!"));
// db.on("disconnected", () => console.log("mongo disconnected"));


// // CORS SECURITY CONFIGURATIONS
// // CREATE A WHITELIST OF WHICH WEBSITES CAN MAKE API CALLS TO YOUR SERVER
// const whitelist = ["http://localhost:3000/", "http://example2.com", "https://project-2-backend.herokuapp.com"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(
//         new Error("Not allowed by CORS, domain needs to be added to whitelist")
//       );
//     }
//   },
// };


// // MIDDLEWARE
// //UTILITY FUNCTIONS THAT RUN BEFORE YOUR ROUTES
// NODE_ENV === "development" ? app.use(cors()) : app.use(cors(corsOptions)); //ternary operator
// // Enables websites in whitelist to make API calls to your server, enables all sites in development
// app.use(express.json()); //Turns JSON from post/put/patch requests and converts them into req.body object
// app.use(morgan("dev")); // Enables Morgan logging, creating more useful terminal logs while server runs
// app.use(express.static("public")); //Allows static serving of files from public folder


// // ROUTES AND ROUTERSss
// //These handle sending responses to server requests for spefic endpoints
//  app.use('/',routes);

// //ROOT ROUTE (FOR TESTING)
// app.get("/", (req, res) => {
//   res.send("If you see this then the server is working!");
// });


// // Server Listener
// //Gets this server running
// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });