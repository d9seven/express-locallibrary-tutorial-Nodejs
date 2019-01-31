var BookInstance = require('../models/bookinstance');
var Book = require('../models/book');
var Author = require('../models/author');
var Genre =  require('../models/genre');

exports.bookinstance_list = function(req, res, next) {
  BookInstance.find().populate('book').exec(function (err, list_bookinstances){
    if (err) {return next(err);}
    res.render('bookinstance_list', {title: 'Book Instance List', bookinstance_list: list_bookinstances});
  });
};

exports.bookinstance_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id);
};

exports.bookinstance_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance create GET');
};

exports.bookinstance_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance create POST');
};

exports.bookinstance_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

exports.bookinstance_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

exports.bookinstance_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update GET');
};

exports.bookinstance_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update POST');
};
