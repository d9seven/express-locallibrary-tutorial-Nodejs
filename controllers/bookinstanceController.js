var BookInstance = require('../models/bookinstance');
var Book = require('../models/book');
var Author = require('../models/author');
var Genre =  require('../models/genre');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.bookinstance_list = function(req, res, next) {
  BookInstance.find().populate('book').exec(function (err, list_bookinstances){
    if (err) {return next(err);}
    res.render('bookinstances/bookinstance_list', {title: 'Book Instance List', bookinstance_list: list_bookinstances});
  });
};

exports.bookinstance_detail = function(req, res, next) {
  BookInstance.findById(req.params.id).populate('book').exec(function (err, bookinstance){
    if (err) {return next(err);}
    if (bookinstance==null){
      var err = new Error('Book copy not found');
      err.status = 404;
      return next(err);
    }
    res.render('bookinstances/bookinstance_detail', {title: 'Bookinstance Detail', bookinstance: bookinstance});
  });
};

exports.bookinstance_create_get = function(req, res, next) {
  Book.find({},'title').exec(function (err, books) {
    if (err) { return next(err); }
    res.render('bookinstances/bookinstance_form', {title: 'Create BookInstance', book_list:books, errors: null, bookinstance: null});
  });
};

exports.bookinstance_create_post = [
  body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
  body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),

  sanitizeBody('book').trim().escape(),
  sanitizeBody('imprint').trim().escape(),
  sanitizeBody('status').trim().escape(),
  sanitizeBody('due_back').toDate(),

  (req, res, next) => {
    const errors = validationResult(req);
    var bookinstance = new BookInstance(
      { book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back
       });

    if (!errors.isEmpty()) {
      Book.find({},'title').exec(function (err, books) {
        if (err) { return next(err); }
        res.render('bookinstances/bookinstance_form', { title: 'Create BookInstance', book_list : books,
          selected_book : bookinstance.book._id , errors: errors.array(), bookinstance:bookinstance });
      });
      return;
    }
    else {
      bookinstance.save(function (err) {
        if (err) { return next(err); }
        res.redirect(bookinstance.url);
      });
    }
  }
];

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
