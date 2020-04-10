 projectData = {};
//Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

/* Middlewares */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Cors for cross origin allowence
const cors = require('cors');
app.use(cors());

//Initilize the main project folder
app.use(express.static('webapp'));

// Setup Server
const port = 8000;

//Spin up the server
const server = app.listen(port, listening);

function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};


app.get('/api/projectdata', (request, response) => {
    response.status(200).send(projectData)
})

app.post('/api/projectdata', (request, response) => {
    const {date, temp, content} = request.body
    projectData[date] = {
      temp,
      content,
    }
    response.status(201).send()
})
