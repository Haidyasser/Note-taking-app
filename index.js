// Description: Main file of the project

// express
const express = require('express');
const app = express();

//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connection to MongoDB
require("./connection/mongoose");

// cors
const cors = require('cors');
app.use(cors());

// static files
app.use(express.static('public'));

// routes
const User = require("./routes/user");
const Note = require("./routes/note");
app.use("/users", User);
app.use("/notes", Note);

// End points for HTML pages
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

let pages = ['login', 'signup', 'index', 'about'];
for (let page of pages) {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(__dirname + `/public/${page}.html`);
  });
}

// port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});