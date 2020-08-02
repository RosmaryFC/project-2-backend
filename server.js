//ADD DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express()
const PORT = process.env.PORT;

//MIDDLEWARE



//ROUTES



//LISTENER
app.listen(PORT, () => {
    console.log("APP is running on PORT: " + PORT);
})