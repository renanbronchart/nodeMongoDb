require('dotenv').config();

// grab our dependencies
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// configure cookie parser
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  cookie: { maxAge: 60000 },
  resave: false, // force the session to be saved back to the store
  saveUninitialized: false // don't save unmodified
}));

app.use(flash());

app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// connect to your database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI);


// use the body parser
app.use(bodyParser.urlencoded({ extended: true }));

// set the routes
app.use(require('./app/routes'));



app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
})
