const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const conn = mongoose.connection;
const bcrypt = require('bcrypt');


async function verify_password(email, password) {
    // get the user from the database
    const user = await conn.collection('users').findOne({email: email});
    // check the password
    if (user) {
        const compare = password === user.password;
        return compare;
    }
    return false;
}

async function verify_admin(email) {
    // get the user from the database
    let user = await conn.collection('users').findOne({email: email});
    // check the password
    if (user) {
        return user.isAdmin==true;
    }
    return false;
}

router.get('/users', async function (req, res, next) {
    conn.collection('users').find().toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    }
)});

router.get('/users/:id', async function (req, res, next) {
    conn.collection('users').find({id: req.params.id}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    }
)});

router.post('/users', async function (req, res, next)  {
    // load model from models\userModel.js
    const UserModel = require('../models/userModel');
    // create a new user
    const user = new UserModel({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        score: 0,
        isAdmin: false
    });
    console.log(user)
    // write to mongodb database
    user.save(function(err, result) {
        if (err) throw err;
        res.json(result);
    })
    conn.collection('users').insertOne(user, function(err, result) {
        if (err) throw err;
        res.json(result);
    })
});

router.put('/users/:email', async function (req, res, next) {
    if (req.body.id) {
        delete req.body.id;
    }
    if (req.body.isAdmin) {
        if (verify_password(req.body.current_email, req.body.current_password) && verify_admin(req.body.current_email)) {
            // remove current password and email
            delete req.body.current_password;
            delete req.body.current_email;
            console.log(req.params.email);
            console.log(req.body);
            conn.collection('users').updateOne({email: req.params.email}, {$set:{"isAdmin":true}}, function(err, result) {
                if (err) throw err;
                res.json(result);
            }, {upsert: true});

        } else {
            res.status(401);
            res.json({ 'status': 'unauthorized' });
        }

    }
    // conn.collection('users').updateOne({id: req.params.id}, {$set: req.body}, function(err, result) {
    //     if (err) throw err;
    //     res.json(result);
    // })
});

router.delete('/users/:id', async function (req, res, next)  {
    if (verify_password(req.body.current_email, req.body.current_password) && verify_admin(req.body.current_email)) {        
        conn.collection('users').deleteOne({id: req.params.id}, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } else {
        res.status(401);
        res.json({ 'status': 'unauthorized' });
    }
});

router.post('/users/login', async function (req, res, next) {
    // get the user from the database
    const user = conn.collection('users').findOne({email: req.body.email});
    if (!user) {
        res.status(404);
        res.json({ 'status': 'email not found' });
    }

    if (verify_password(req.body.email, req.body.password)) {
        res.status(200);
        res.json({ 'status': 'ok' });
    } else {
        res.status(401);
        res.json({ 'status': 'unauthorized' });
    }
});

module.exports = router;