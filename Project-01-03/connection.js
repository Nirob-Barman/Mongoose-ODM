const mongoose = require("mongoose");

async function connectMongoDb(uri) {
    // return mongoose.connect(uri)
    // return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, })
    return mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
}

module.exports = {
    connectMongoDb,
}