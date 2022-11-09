const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const conn = mongoose.connection;
// load functions from users.js
const { verify_password, verify_admin } = require('./users');
// load the mongoose conn from app.js
router.post('/submit-score-20/:id', (req, res, next) => {
	// check if admin and verify password
	if (verify_admin(req.body.email) && verify_password(req.body.email, req.body.password)) {
		// get the user from the database
		let user = conn.collection('users').findOne({id: req.params.id});
		// check the password
		if (user) {
			// update the score
			user.score += 20;
			// write to mongodb database
			conn.collection('users').updateOne({id: req.params.id}, user, function(err, result) {
				if (err) throw err;
				res.json(result);
			})
		} else {
			res.status(404);
			res.json({ 'status': 'user not found' });
		}
	} else {
		res.status(401);
		res.json({ 'status': 'unauthorized' });
	}
});
router.post('/submit-score-60/:id', (req, res, next) => {
	// check if admin and verify password
	if (verify_admin(req.body.email) && verify_password(req.body.email, req.body.password)) {
		// get the user from the database
		let user = conn.collection('users').findOne({id: req.params.id});
		// check the password
		if (user) {
			// update the score
			user.score += 60;
			// write to mongodb database
			conn.collection('users').updateOne({id: req.params.id}, user, function(err, result) {
				if (err) throw err;
				res.json(result);
			})
		} else {
			res.status(404);
			res.json({ 'status': 'user not found' });
		}
	} else {
		res.status(401);
		res.json({ 'status': 'unauthorized' });
	}
});
router.post('/submit-score-100/:id', (req, res, next) => {
	// check if admin and verify password
	if (verify_admin(req.body.email) && verify_password(req.body.email, req.body.password)) {
		// get the user from the database
		let user = conn.collection('users').findOne({id: req.params.id});
		// check the password
		if (user) {
			// update the score
			user.score += 100;
			// write to mongodb database
			conn.collection('users').updateOne({id: req.params.id}, user, function(err, result) {
				if (err) throw err;
				res.json(result);
			})
		} else {
			res.status(404);
			res.json({ 'status': 'user not found' });
		}
	} else {
		res.status(401);
		res.json({ 'status': 'unauthorized' });
	}

});
router.get('/scores', (req, res, next) => {
	// get all scores
	// sort by reverse order of score
	let scores = conn.collection('users').find().sort({score: -1});
	// return the scores
	res.json(scores);
});

console.log("Aroo the goat")
module.exports = router;