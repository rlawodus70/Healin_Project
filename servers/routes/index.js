const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('./database.js');
const connection = mysql.createConnection(dbconfig);

connection.connect(err => {
    if(err) console.log(err)
});

router.get('/users', (req, res) => {
    connection.query('select * from users', (err, rows) => {
        if(err) throw err;
        res.json(rows[0])
    })
});

router.get('/login', (req, res) => {

})

module.exports = router;