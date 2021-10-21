const express = require('express')
const productController = require('../../Controllers/Product/product_controllers')

const router = express.Router()

// Retrieve all product from DB Route
router.get('/', productController.getProducts)

router.get('/categories', productController.getProductsCategories)

router.post('/', productController.createProduct)

// Route to update existing product
router.patch('/:pid', productController.updateProuctById)

// Route to delete existing product
router.delete('/:pid', productController.deleteProductById)

// Route to retrieve product by ID
router.get('/id=:pid', productController.getProductById)

// Route to retrieve product by Category
router.get('/category=:category', productController.getProductsByCategory)

// Route to retrieve product by Title
router.get('/title=:title', productController.getProductsByTitle)

router.get('/limit=:num', productController.getProductByLimit)



module.exports = router