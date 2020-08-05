//ADD DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.js');


//GLOBAL VARIABLES
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

//TODO:add netlify url to whitelist
// CORS SECURITY CONFIGURATIONS
const whitelist = ["http://localhost:3000/", "https://project-2-karate.herokuapp.com/"];
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
app.use('/',routes);

app.get('/', (req,res) => {
  res.send('routes working');
})


//LISTENER
app.listen(PORT, () => {
    console.log("APP is running on PORT: " + PORT);
})