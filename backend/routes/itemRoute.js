const express = require("express");
const router = express.Router();
const Item = require("../models/itemModel");

router.get("/", async (req, res) => {
    try{
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const item = await Item.find({_id: id})
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get("/user/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const items = await Item.find({ownerId: id})
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post("/", async (req, res) => {
    const { name, price, ownerId, size, file } = req.body;

    const item = new Item({
        name: name,
        price: price,
        ownerId: ownerId,
        size: size,
        file: file
    });
    try {
        const newItem = await item.save();
        res.status(201).json({
            _id: newItem._id,
            name: name
        })
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        await Item.deleteOne({_id: id})
        res.status(201).json({_id: id})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;