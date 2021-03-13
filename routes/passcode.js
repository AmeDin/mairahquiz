const express = require('express');
const router = express.Router();
const cryptoRandomString = require('crypto-random-string');

// User Model
const Passcode = require('../models/Passcode');

// @route   POST api/passcode
// @desc    Verify passcode
// @access  Public
router.post('/', (req, res) => {
  const { code } = req.body;
  console.log(req.body)
  console.log(code)

  // Simple validation
  if(!code) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const filter = { "code" : code };
  const update = { code: cryptoRandomString({length: 6, type: 'base64'}) };
  // Check for existing user
  Passcode.findOneAndUpdate(filter, update, {new: true}, (err, respond) => {
    console.log(respond)
    if (!respond) {
          return res.status(400).json({ msg: 'Invalid Passcode' });
        }
        return res.status(200).json({ msg: 'Access granted' });
    });

})

// @route   POST api/passcode/add
// @desc    Create a passcode
// @access  Private
router.post('/add', (req, res) => {
  const { code } = req.body;
  const newPasscode = new Passcode({
      code: code
  });

  newPasscode.save()
      .then(passcode => res.json(passcode));
});

// @route   POST api/passcode/add
// @desc    Create a passcode
// @access  Private
router.get('/shiatsu', (req, res) => {
  Passcode.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
    return res.status(200).json(post);
  });

  
});



module.exports = router;