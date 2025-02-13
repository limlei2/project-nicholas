const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { compare, genSalt, hash } = require("bcrypt");

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const users = await User.find({_id: id});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.post("/register", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = new User({
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword
    });
    try {
        const newUser = await user.save();
        dotenv.config();
        const token = jwt.sign(user.toJSON(), process.env.MY_SECRET, { expiresIn: "1d" });
        res.status(201).json({
            _id: newUser._id,
            email: email,
            token: token
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    
    if (user && await compare(password, user.password)){
        dotenv.config();
        const token = jwt.sign(user.toJSON(), process.env.MY_SECRET, { expiresIn: "1d" });
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3*24*60*60*1000})
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: token
        });
    } else {
        return res.status(401).end("Access Denied");
    }
});

router.get("/logout", (req, res) => {
    try {
        res.cookie('jwt', 'none', {
            expires: new Date(Date.now()),
            httpOnly: true,
          });
        res.status(200).json("Successfully Logged Out");
    } catch (err){
        res.status(500).json("Failed to Log Out");
    }
    
});

router.delete("/:id", (req, res) => {

});

module.exports = router;