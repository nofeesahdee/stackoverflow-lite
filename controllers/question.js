const asyncHandler = require('../middleware/async')
const Question = require('../models/Questions')
// const auth = require('../middleware/auth')

// post a question
exports.postQuestion = asyncHandler(async (req, res, next) => {
    const question = new Question({
        ...req.body,
        owner:req.body._id
    })

    try {
        await question.save()
        res.status(201).send(question)
    } catch (e) {
        res.status(400).send(e)
    }
})

// users can delete questions
// router.delete('/tasks/:id', auth, async (req, res) => {
//     try {
//         const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

//         if (!task) {
//             res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// })
