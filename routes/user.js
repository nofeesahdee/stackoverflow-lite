const express = require('express');
const router = express.Router();

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
} = require('../controllers/user')

router
    .route('/users')
    .get(getUsers)
    .post(createUser)

router
    .route('/users/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;