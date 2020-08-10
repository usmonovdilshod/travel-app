
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 8050;
const server = app.listen(port, function () {
    console.log(`server is running ${port}`);
});



//get route 
app.get('/', (req, res) => {
    res.send('dist/index.html');
});



const sum = (a, b) => {
    return a + b;
}

module.exports = sum; 

