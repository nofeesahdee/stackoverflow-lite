const express = require('express');
const router = express.Router();
const {
    // getUsers,
    // getUser,
    registerUser,
    loginUser,
    logoutUser,
    // updateUser,
    // deleteUser,
    // logoutUser,
} = require('../controllers/user')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)

// router
//     .route('/users/:id')
//     .get(getUser)
//     .put(updateUser)
//     .delete(deleteUser)

module.exports = router;