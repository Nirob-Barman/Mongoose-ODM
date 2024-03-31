const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
});

const Book = mongoose.model("Book", bookSchema, "testBooks");

module.exports = Book;