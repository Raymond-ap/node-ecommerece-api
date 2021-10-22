const mongoose = require('mongoose')

const Carts = mongoose.Schema({
    userId: {type: String, required: true},
    products: [
        {
            productId: {type: String, required: true},
            quantity: { type: Number, required: false}
        }
    ],
    date: {type: String, required: false}
})

module.exports = mongoose.model('Cart', Carts)