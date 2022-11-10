const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const conn = mongoose.connection;
// load functions from users.js
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
// load the mongoose conn from app.js
router.post('/submit-score-20/:email', async function (req, res, next) {
	// check if admin and verify password
	if (verify_admin(req.body.email) && verify_password(req.body.email, req.body.password)) {
		// get the user from the database
		let user = await conn.collection('users').findOne({email: req.params.email});
		// check the password
		if (user) {
			// update the score
			user.Score += 20;
      console.log(user);
			// write to mongodb database
			conn.collection('users').updateOne({email: req.params.email}, {$set:user}, function(err, result) {
        
				if (err) throw err;
				res.json(result);
			})
		} else {
      console.log(user)
			res.status(404);
			res.json({ 'status': 'user not found' });
		}
	} else {
		res.status(401);
		res.json({ 'status': 'unauthorized' });
	}
});
router.post('/submit-score-60/:email', async function (req, res, next)  {
	// check if admin and verify password
	if (verify_admin(req.body.email) && verify_password(req.body.email, req.body.password)) {
		// get the user from the database
		let user = await conn.collection('users').findOne({email: req.params.email});
		// check the password
		if (user) {
			// update the score
			user.Score += 60;
			// write to mongodb database
			conn.collection('users').updateOne({email: req.params.email}, {$set:user}, function(err, result) {
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
router.post('/submit-score-100/:email', async function (req, res, next) {
	// check if admin and verify password
	if (verify_admin(req.body.email) && verify_password(req.body.email, req.body.password)) {
		// get the user from the database
		let user = await conn.collection('users').findOne({email: req.params.email});
		// check the password
		if (user) {
			// update the score
			user.Score += 100;
			// write to mongodb database
			conn.collection('users').updateOne({email: req.params.email}, {$set:user}, function(err, result) {
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
	let scores = conn.collection('users').find({});
  scores.sort({Score:-1});
  console.log(scores);
  scores.toArray((error, documents) => {
    if (error) { return handleError(res, error.message, "Failed to get post"); }
    console.log(documents)
    res.status(200).send(documents);
  });
  

});

console.log("Aroo the goat")
module.exports = router;