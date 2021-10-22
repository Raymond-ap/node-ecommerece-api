const express = require('express')
const { check } = require('express-validator')
const usersController = require('../../Controllers/User/user_controller')

const router = express.Router()

router.get('/', usersController.getUsers)

router.get('/:uid', usersController.getusersById)

router.delete('/:uid', usersController.deleteUserById)

router.post('/', [
    check('username').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('phone').not().isEmpty().isLength({min: 10})
], usersController.createUser)

module.exports = router