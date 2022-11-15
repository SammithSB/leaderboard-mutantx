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

router.get('/users/:email', async function (req, res, next) {
    conn.collection('users').find({email: req.params.email}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    }
)});

router.post('/users', async function (req, res, next)  {
    try{
        // load model from models\userModel.js
        const UserModel = require('../models/userModel');
        // create a new user
        let user = null;
        console.log(user);
        user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            score: 0,
            isAdmin: false,
            scoreChange: 0
        });
        console.log(user)
        // check if the user already exists
        let userExists = await conn.collection('users').findOne({email: user.email});
        if (userExists) {
            res.status(400).json({message: 'User already exists'});
            return;
        } 

        conn.collection('users').insertOne(user, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.log(err);
    }
});

router.put('/users/:email', async function (req, res, next) {
    if (req.body.email) {
        delete req.body.email;
    }
    if (req.body.isAdmin) {
        if (verify_password(req.body.current_email, req.body.current_password) && verify_admin(req.body.current_email)) {
            // remove current password and email
            delete req.body.current_password;
            delete req.body.current_email;
            // conn.collection('users').updateOne({email: req.params.email}, {$set:req.body}, function(err, result) {
            conn.collection('users').updateOne({email: req.params.email}, {$set:{"isAdmin":true}}, function(err, result) {

                if (err) throw err;
                res.json(result);
            },{upsert:true})
            // conn.collection('users').updateOne({email: req.params.email}, {$set:{"isAdmin":true}}, function(err, result) {
            //     if (err) throw err;
            //     res.json(result);
            // }, {upsert: true});

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

router.delete('/users/:email', async function (req, res, next)  {
    console.log(await verify_password(req.body.current_email, req.body.current_password), (await verify_admin(req.body.current_email), (req.params.email==req.body.current_email)))
    if (await verify_password(req.body.current_email, req.body.current_password) && (await verify_admin(req.body.current_email) || (req.params.email==req.body.current_email))) {        
        conn.collection('users').deleteOne({email: req.params.email}, function(err, result) {
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