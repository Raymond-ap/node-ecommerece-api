const express = require('express')
const cartController = require('../../Controllers/Cart/cart_controller')

const router = express.Router()

router.get('/', cartController.getCartItems)

router.get('/:uid', cartController.getCartItemsByUserId)


module.exports = router