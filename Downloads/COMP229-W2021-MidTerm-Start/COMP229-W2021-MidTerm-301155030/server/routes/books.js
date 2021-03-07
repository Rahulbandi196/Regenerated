// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
      // find all books in the books collection
    book.find( (err, books) => {
      if (err) 
      {
        return console.error(err);
      }
        else 
      {

        res.render('books/list', {title: 'Books', books: books}); 
      }
    });
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/add', {title: 'Add Book'})

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
   let newBook = Book({
     "name": req.body.name,
     "author": req.body.author,
     "published": req.body.published,
     "description": req.body.description,
     "price": req.body.price,
   });
 
   Book.create(newBook, (err, Book) => {
     if(err)
      {
        console.log(err);
        res.end(err);
      }
     else
      {
        //ref the booklist
         res.redirect('/books');
      }
   });
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  Book.findById(id, (err, booktoEdit) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //show edit view
      res.render('books/edit', {title: 'Edit Book', book: booktoEdit})
    }

  });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id

  let updateBook = Book({
    "id": id,
    "name": req.body.name,
    "author": req.body.author,
    "published": req.body.published,
    "description": req.body.description,
    "price": req.body.price,
  });
  
  Book.updateOne({_id: id}, updatedBook, (err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //refresh the booklist
      res.redirect('/books');
    }

  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  
  Book.remove({_id: id}, (err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //refresh the booklist
      res.redirect('/books');
    }

  });

});


module.exports = router;
