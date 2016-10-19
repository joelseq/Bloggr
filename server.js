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

// =======================================================================
// RESTful Routes
// HTTP Verbs: GET, POST, PUT, DELETE
//
// Name     |   Path      |   HTTP Verb |   Purpose
// =======================================================================
// Index    |   /         |   GET       | List all the posts
// New      |   /new      |   GET       | Show a form to create new posts
// Create   |   /         |   POST      | Create a new post
// Show     |   /:id      |   GET       | Show a single post
// Edit     |   /:id/edit |   GET       | Show a form to edit a post
// Update   |   /:id      |   PUT       | Update a particular post
// Destroy  |   /:id      |   DELETE    | Delete a particular post
// =======================================================================

//======================
// GET all posts
//======================
app.get('/', (req, res) => {

  // Find all the documents
  db.allDocs({
    include_docs: true,
    attachments: true
  }, (err, result) => {
    // If there was an error, log it
    if(err) {
      console.log(err);
    }
    // Else render the 'posts' view and pass it all the posts
    else {
      res.render('posts', { posts: result.rows });
    }
  });

});


app.get('/ping', (req, res) => {
  res.send('Hello NodeSchool!');
});

app.listen(PORT, () => console.log('Server listening on port: ' + PORT));
