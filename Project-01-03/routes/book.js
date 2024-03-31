const express = require("express");

const router = express.Router();

// const Book = require("../models/book");
const { handleCreateNewBook, handleGetAllBooks, handleGetBookById, handleUpdateBookById, handleDeleteBookById } = require("../controllers/book");

// router.get("/", async (req, res) => {
//     const allBooks = await Book.find({});
//     return res.json(allBooks);
// });


// router.post('/', handleCreateNewBook);
// router.get('/', handleGetAllBooks);

router.route('/')
    .get(handleGetAllBooks)
    .post(handleCreateNewBook);


// router.post("/", async (req, res) => {
//     const body = req.body;
//     if (!body || !body.title || !body.author) {
//         return res.status(400).json({ message: "All fields are required" });
//     }
//     const newBook = await Book.create({
//         title: body.title,
//         author: body.author,
//     });
//     // console.log(newBook);
//     return res
//         .status(201)
//         .json({ message: "Book creation success", id: newBook._id });
// });

// router.route('/:id').get(async (req, res) => {
//     const book = await Book.findById(req.params.id);
//     if (!book) {
//         return res.status(404).json({ message: "Book not found" });
//     }
//     return res.json(book);
// }).patch(async (req, res) => {
//     await Book.findByIdAndUpdate(req.params.id, { title: req.body.title });
//     return res.json({ message: "Book update success" });
// }).delete(async (req, res) => {
//     await Book.findByIdAndDelete(req.params.id);
//     return res.json({ message: "Book deletion success" });
// })

router.route('/:id')
    .get(handleGetBookById)
    .patch(handleUpdateBookById)
    .delete(handleDeleteBookById);

module.exports = router;