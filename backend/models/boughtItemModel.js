const mongoose = require("mongoose");

const boughtItemSchema = new mongoose.Schema(
    {   
        itemname: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        tax: {
            type: Number,
            required: true
        },

        paid: {
            type: Number,
            required: true
        },

        size: {
            type: Number,
            required: true
        },

        buyerId: {
            type: String,
            required: true
        },

        sellerId: {
            type: String,
            required: true
        },

        file: {
            type: String,
            required: true
        },

        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        postal: {
            type: String,
            required: true
        },

        country: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        cardName: {
            type: String,
            required: true
        },

        cardNumber: {
            type: Number,
            required: true
        },

        cardCVV: {
            type: Number,
            required: true
        },

        cardMonth: {
            type: Number,
            required: true
        },

        cardYear: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("BoughtItem", boughtItemSchema);