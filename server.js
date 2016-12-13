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
const flash = require('flash');

// configure cookie parser
app.use(cookieParser());
app.use(session({
  secret: 'my-super-secret',

}))


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

app.get('/', (req, res) => {
  res.send('Hello, i am the app');
})



app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
})
