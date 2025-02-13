const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        price: {
            type: Number,
            required: true
        },

        size: {
            type: Number,
            required: true
        },

        ownerId: {
            type: String,
            required: true
        },

        file: {
            type: String,
            required: true
        }

    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Item", itemSchema);