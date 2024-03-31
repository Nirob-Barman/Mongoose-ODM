const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allUsers = await User.find({});
    return res.json(allUsers);
}

module.exports = { handleGetAllUsers }