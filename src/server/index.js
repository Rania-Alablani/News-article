// Connect dependencies and libraries
var path = require('path')
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
var MeaningCloud = require("MeaningCloud");

const dotenv = require('dotenv');
dotenv.config();

//Variables
let projectData = {};

// Setting up the credentials for the api
var textApi = new MeaningCloud({
    application_key: process.env.API_KEY
});

const requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
  .then(response => ({
    status: response.status,
    body: response.json()
  }))
  .then(({ status, body }) => console.log(status, body))
  .catch(error => console.log('error', error));

// Creating an instance of the app
const app = express()

// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initializing the production folder
app.use(express.static('dist'))


// Requests
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


app.post("/api", (req, res) => {
  const text = req.body;
  console.log("Request to '/api' endpoint", text);
  textApi.sentiment(text, (error, result, remaining) => {
    if(error) console.log(error);
    console.log("MeaningCloud Callback Response and Remaining requests available", result, remaining);
    res.send(result);
  });
});

// Setup Server
const port = 8080;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Evalute NLP app's server listening on port ${port}!`);
});
