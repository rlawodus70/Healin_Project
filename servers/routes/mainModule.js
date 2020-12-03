const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('./database.js');
const connection = mysql.createConnection(dbconfig);

connection.connect(err => {
    if(err) console.log(err)
});

router.post('/checkSession', (req, res) => {
    console.log(req.session.uid)
    res.json(req.session.uid);
})

module.exports = router;