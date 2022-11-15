const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const conn = mongoose.connection;
// get current rankings
// to do
router.get('/rankings', async function (req, res, next) {
    conn.collection('users').find().sort({score:-1}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    }
)});
// individual graphs of scores
router.get('/scores/:email', async function (req, res, next) {
    conn.collection('users').find({email: req.params.email}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    }
)});
module.exports = router;