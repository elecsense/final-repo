//create web server
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');
//const passport = require('passport');
const Comment = require('../models/comment');
const User = require('../models/user');
const mongoose = require('mongoose');

// router.post('/add', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//     let newComment = new Comment({
//         _id: new mongoose.Types.ObjectId(),
//         text: req.body.text,
//         user: req.user._id
//     });
//     newComment.save((err, comment) => {
//         if (err) {
//             res.json({ success: false, msg: 'Failed to add comment' });
//         } else {
//             res.json({ success: true, msg: 'Comment added' });
//         }
//     });
// });

router.post('/add', (req, res, next) => {
    let newComment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        text: req.body.text,
        user: req.body.user
    });
    newComment.save((err, comment) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add comment' });
        } else {
            res.json({ success: true, msg: 'Comment added' });
        }
    });
});

router.get('/all', (req, res, next) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to get comments' });
        } else {
            res.json({ success: true, comments: comments });
        }
    }).populate('user');
});

router.post('/delete', (req, res, next) => {
    Comment.findByIdAndRemove(req.body._id, (err, comment) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to delete comment' });
        } else {
            res.json({ success: true, msg: 'Comment deleted' });
        }
    });
});

module.exports = router;