const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const PouchDB = require('pouchdb');
const methodOverride = require('method-override');

// Set the port to listen to requests on
const PORT = process.env.PORT || 3000;

// Create the app
const app = express();

// Create the database
const db = new PouchDB('blog');

// =========================
// App Configs
// =========================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// =================================================
// RESTful Routes
// HTTP Verbs: GET, POST, PUT, DELETE
// =================================================
app.get('/ping', (req, res) => {
  res.send('Hello NodeSchool!');
});

app.listen(PORT, () => console.log('Server listening on port: ' + PORT));
