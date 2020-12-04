const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('./database.js');
const connection = mysql.createConnection(dbconfig);

connection.connect(err => {
    if(err) console.log(err)
});

router.post('/check', (req, res) => {
    const result = {
        nonLogin : ''
    }
    if(req.session.uid === '') {
        result.nonLogin = true;
    } else {
        result.nonLogin = false;
    }
    console.log(req.session.uid)
    res.json(result);
})

module.exports = router;