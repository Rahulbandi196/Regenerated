let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    name: String,
    author: String,
    published: Number,
    description: String,
    price: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
