const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");


const { connectMongoDb } = require("./connection");

const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");

const { logReqRes } = require("./middleware");

// Express middleware
app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xceqs5c.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xceqs5c.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

// Connect Mongoose to MongoDB
connectMongoDb(uri);
    // .then(() => console.log("Connected to MongoDB"))
    // .catch((err) => console.error("Error connecting to MongoDB:", err));;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));


app.use(logReqRes("./log.txt"));

// Schema


app.get("/", (req, res) => {
    return res.send("Mock API");
});



// Routes

app.use('/books', bookRouter);
app.use('/users', userRouter);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
