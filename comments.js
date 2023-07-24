//create a web server
const express = require('express');
const app = express();
//connect to mongoDB
const mongoose = require('mongoose');
//require the model
const Comment = require('./models/comment');
//require the seed file
const seedDB = require('./seed');
//require the body-parser
const bodyParser = require('body-parser');
//require the method-override
const methodOverride = require('method-override');
//require the express-sanitizer
const expressSanitizer = require('express-sanitizer');

//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));
//set the view engine
app.set('view engine', 'ejs');
//use the body-parser
app.use(bodyParser.urlencoded({ extended: true }));
//use the express-sanitizer
app.use(expressSanitizer());
//use the method-override
app.use(methodOverride('_method'));
//use the seedDB
seedDB();

//RESTful routes
//root route
app.get('/', (req, res) => {
    res.redirect('/comments');
});
//INDEX route
app.get('/comments', (req, res) => {
    Comment.find({}, (error, comments) => {
        if (error) {
            console.log(error);
        } else {
            res.render('index', { comments: comments });
        }
    });
});
//NEW route
app.get('/comments/new', (req, res) => {
    res.render('new');
});
//CREATE route
app.post('/comments', (req, res) => {
    req.body.comment.body = req.sanitize(req.body.comment.body);
    Comment.create(req.body.comment, (error, newComment) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/comments');
        }
    });
});
//SHOW route
app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id, (error, foundComment) => {
        if (error) {
            console.log(error);
        } else {
            res.render('show', { comment: foundComment });
        }
    });
});
//EDIT route
app.get('/comments/:id/edit', (req, res) => {
    Comment.findById(req.params.id, (error, found