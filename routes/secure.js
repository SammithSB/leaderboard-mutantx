const express = require('express');
const router = express.Router();
router.post('/submit-score-20', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});
router.post('/submit-score-60', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});
router.post('/submit-score-100', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});
router.get('/scores', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});
console.log("Aroo the goat")
module.exports = router;