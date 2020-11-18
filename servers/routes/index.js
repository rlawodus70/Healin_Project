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

router.post('/signIn', (req, res) => {
    const user = req.body;
    const sql = `select * from users where id = '${user.id}' and password = '${user.pw}'`;
    connection.query(sql, (err, rows) => {
        if(err) throw err;
        if(rows.length === 1) {
            console.log("로그인 성공!");
        } else {
            console.log("로그인 실패!..");
        }
    })
})

router.post('/signUp', (req, res) => {
    const user = req.body;
    const sql = `insert into users values('${user.id}','${user.pw}','${user.email}')`;
    connection.query(sql, (err, rows) => {
        if(err) throw err;
        else console.log(rows.insertId)
    })
})

module.exports = router;