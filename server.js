require('dotenv').config();

// grab our dependencies
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// connect to your database
mongoose.connect(process.env.DB_URI);


// set the routes
app.use(require('./app/routes'));

app.get('/', (req, res) => {
  res.send('Hello, i am the app');
})



app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
})
