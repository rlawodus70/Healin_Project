const express = require('express');
const login = require('./routes/loginModule');
const main = require('./routes/mainModule');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const dbconfig = require('./routes/database.js');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const sessionStore = new MySqlStore(dbconfig);


app.use(session({
    secret: 'winterproject',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}))
app.use(bodyParser.json());
app.use('/home', main);
app.use('/user', login);


app.listen(port, () => {
    console.log(`express is running on ${port}`);
})