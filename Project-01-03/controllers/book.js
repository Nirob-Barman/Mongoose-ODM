const Book = require("../models/book");

async function handleCreateNewBook(req, res) {
    const body = req.body;
    if (!body || !body.title || !body.author) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newBook = await Book.create({
        title: body.title,
        author: body.author,
    });
    // console.log(newBook);
    return res
        .status(201)
        .json({ message: "Book creation success", id: newBook._id });
}

async function handleGetAllBooks(req, res) {
    const allBooks = await Book.find({});
    return res.json(allBooks);
}

async function handleGetBookById(req, res) {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    return res.json(book);
}

async function handleUpdateBookById(req, res) {
    await Book.findByIdAndUpdate(req.params.id, { title: req.body.title });
    return res.json({ message: "Book update success" });
}

async function handleDeleteBookById(req, res) {
    await Book.findByIdAndDelete(req.params.id);
    return res.json({ message: "Book deletion success" });
}

module.exports = { handleCreateNewBook, handleGetAllBooks, handleGetBookById, handleUpdateBookById, handleDeleteBookById }