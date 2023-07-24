//create web server
//create web server
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var util = require('util');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
//connect to MongoDB
mongoose.connect('mongodb://localhost/Comments');
//create schema
var commentSchema = new Schema({
    name: String,
    comment: String
});
//create model
var Comment = mongoose.model('Comment', commentSchema);
//create a new comment
var comment1 = Comment({ name: 'Maggie', comment: 'This is a comment' });
//save comment
comment1.save(function(err) {
    if (err) throw err;
    console.log('Comment saved!');
});
//get all comments
Comment.find({}, function(err, comments) {
    if (err) throw err;
    console.log(comments);
});
//get one comment
Comment.find({ name: 'Maggie' }, function(err, comments) {
    if (err) throw err;
    console.log(comments);
});
//get any comment containing a c
Comment.find({ comment: /c/ }, function(err, comments) {
    if (err) throw err;
    console.log(comments);
});
//get any comment with a name starting with M
Comment.find({ name: /^M/ }, function(err, comments) {
    if (err) throw err;
    console.log(comments);
});
//get any comment with a name starting with M
Comment.find({ name: /^M/ }, function(err, comments) {
    if (err) throw err;
    console.log(comments);
});
//get any comment with a name starting with M
Comment.find({ name: /^M/ }, function(err, comments) {
    if (err) throw err;
    console.log(comments);
});
//get any comment with a name starting with M
Comment.find({ name: /^M/ }, function(err, comments) {
    if (err) throw err;
    console.log(comments);
});
//get any comment with a name starting with M
Comment.find({ name: /^M/ }, function(err, comments) {
    if (err) throw err;


