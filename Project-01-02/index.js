const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

const mongoose = require("mongoose");

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xceqs5c.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xceqs5c.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

// Connect Mongoose to MongoDB
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Express middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    // console.log("Hello from middleware 1");
    fs.appendFile(
        "./log.txt",
        `${Date.now()} : ${req.method} : ${req.path}\n`,
        (err, data) => {
            next();
        }
    );
});

app.use((req, res, next) => {
    // console.log("Hello from middleware 2");
    next();
});

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: String,
        email: {
            type: String,
            required: true,
            unique: true,
        },
        jobTitle: String,
        gender: String,
    },
    { timestamps: true }
);

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
});

const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema, "testBooks");

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // console.log("Hello from middleware 1");
    fs.appendFile(
        "./log.txt",
        `${Date.now()} : ${req.method} : ${req.path}\n`,
        (err, data) => {
            next();
        }
    );
    // return res.json({ message: "hello from middleware 1" });
    // next();
});

app.use((req, res, next) => {
    // console.log("Hello from middleware 2");
    // return res.json({ message: "hello from middleware 2" });
    next();
});

// const users = require("./MOCK_DATA.json");

app.get("/", (req, res) => {
    return res.send("Mock API");
});

// app.get("/books", async (req, res) => {
//     const allBooks = await Book.find({});
//     return res.json(allBooks);
// });

// Two operations below
app.get("/books", async (req, res) => {
    try {
        const title = req.query.title;
        console.log('title from query', title);
        if (!title) {
            // Find all books
            const allBooks = await Book.find({});
            return res.json(allBooks);
        }

        // Find book by title
        const book = await Book.findOne({ title });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.json(book);
    } catch (error) {
        console.error("Error finding book by title:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/books/:id', async (req, res) => {
    const id = req.params.id;
    const book = await Book.findById(id);
    return res.json(book);
})

app.post("/books", async (req, res) => {
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
});

// app.get("/users", async (req, res) => {
//     const allUsers = await User.find({});
//     return res.json(allUsers);
// });

app.get("/users", async (req, res) => {
    const email = req.query.email;
    if (!email) {
        const allUsers = await User.find({});
        return res.json(allUsers);
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
});

// app.route('/users/:id').get((req, res) => {
//     // TODO: Get the user
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user);
// }).patch((req, res) => {
//     // TODO: Edit the user
// }).delete((req, res) => {
//     // TODO: Delete the user
// })

app.get("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
});

app.post("/users", async (req, res) => {
    const body = req.body;
    if (
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.jobTitle ||
        !body.gender
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newUser = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        jobTitle: body.jobTitle,
        gender: body.gender,
    });
    // console.log(newUser);
    return res
        .status(201)
        .json({ message: "User creation success", id: newUser._id });
});

app.patch("/users/:id", async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: req.body.lastName });
    return res.json({ message: "User update success" });
});

app.delete("/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: "User deletion success" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
