const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");

const PORT = 3001;

const userRoute = require("./routes/userRoute");
const itemRoute = require("./routes/itemRoute");
const boughtItemRoute = require("./routes/boughtItemRoute");

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));

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

app.use("/api/users", userRoute);
app.use("/api/items", itemRoute);
app.use("/api/boughtitems", boughtItemRoute);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})