const express = require("express");

const router = express.Router();

// const User = require("../models/user");
const { handleGetAllUsers } = require("../controllers/user");

// router.get("/", async (req, res) => {
//     const allUsers = await User.find({});
//     return res.json(allUsers);
// });

router.get('/', handleGetAllUsers);



// router.route('/:id').get((req, res) => {
//     // TODO: Get the user
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user);
// }).patch((req, res) => {
//     // TODO: Edit the user
// }).delete((req, res) => {
//     // TODO: Delete the user
// })

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
});


router.post("/", async (req, res) => {
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

router.patch("/:id", async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: req.body.lastName });
    return res.json({ message: "User update success" });
});

router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: "User deletion success" });
});

module.exports = router;