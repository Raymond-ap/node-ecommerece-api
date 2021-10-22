const mongoose = require('mongoose')

const Products = mongoose.Schema({
    title: { type: String, required: true},
    price: { type: Number, required: true},
    description: { type: String, required: true},
    category: { type: String, required: true},
    image: { type: Image, required: true},
    rating: {
        rate: { type: Number, required: false},
        count: { type: Number, required: false},
    }
})

module.exports = mongoose.model("Product", Products)