const express = require('express');
const router = express.Router();
const {
    postQuestion,
    deleteQuestion,
} = require('../controllers/question')

router.post('/question',postQuestion)
    // .post(deleteQuestion)

module.exports = router;