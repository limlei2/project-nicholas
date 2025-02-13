const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const multer = require("multer");

const PORT = 3001;

const userRoute = require("./routes/userRoute");
const itemRoute = require("./routes/itemRoute");
const boughtItemRoute = require("./routes/boughtItemRoute");

//const newItemModel = require("./models/newItemModel");

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({
    storage: Storage
}).single('testImage')

async function connect() {
    try {
        dotenv.config();
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}
connect();

/*
app.post("/api/newitems/", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            const newItem = new newItemModel({
                name: req.body.name,
                price: req.body.price,
                size: req.body.size,
                ownerId: req.body.ownerId,
                file: {
                    data: req.file.filename,
                    contentType: "image/png",
                },
            });
            newItem
                .save()
                .then(() => res.send(success))
                .catch((err) => console.log(err))
        }
    })
})
*/

app.use("/api/users", userRoute);
app.use("/api/items", itemRoute);
app.use("/api/boughtitems", boughtItemRoute);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})