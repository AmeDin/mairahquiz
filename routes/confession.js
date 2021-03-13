const express = require('express');
const router = express.Router();

// Confession Model
const Confession = require('../models/Confession');


// @route   POST api/
// @desc    Create a confession
// @access  Private
router.post('/', (req, res) => {
    
    const newConfession = new Confession({
        answer: req.body.answer,
        details: req.body.details
    });
    newConfession.save().then(confession => res.json(confession));
});

module.exports = router;