const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'wnddkd1204',
    database : 'my_db',
    insecureAuth: true
});

connection.connect(err => {
    if(err) console.log(err)
});

router.get('/users', (req, res)=> {
    connection.query('select * from users', (err, rows) => {
        if(err) throw err;
        console.log(`sql connected! rows : ${rows[0]}`);
        res.json(rows[0])
    })
});

module.exports = router;