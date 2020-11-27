const express = require('express');
const login = require('./routes/loginModule');
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
app.use('/api', login);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})