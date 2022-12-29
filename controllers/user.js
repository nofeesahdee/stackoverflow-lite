const express = require('express')
const asyncHandler = require('../middleware/async')
const auth = require('../middleware/auth')
// const router = new express.Router()


// @desc Get all Users
// @routes GET /api/v1/stackoverflow/users
// @access Public
exports.getUsers = asyncHandler(async (req, res, next) => { 
    // const user = await User.find(req.body)
    // res.status(200).json({ success: true,count: bootcamp.length, data: bootcamp })
})

// @desc Get a single bootcamp
// @routes GET /api/v1/bootcamps/:id
// @access Public
exports.getUser = asyncHandler(async (req, res, next) => { 
    // const bootcamp = await Bootcamp.findById(req.params.id)

    // if(!bootcamp){
    //     return next(
    //         new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    //     )
    // }

    // res.status(200).json({ success: true, data: bootcamp})
})

// @desc Create user
// @routes POST /api/v1/stackoverflow/user
// @access Private
exports.createUser = asyncHandler(async (req, res, next) => { 
    const user = await User.create(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// @desc login user
// @routes POST /api/v1/stackoverflow/users/login
// @access Private
exports.loginUser = asyncHandler(async (req, res, next) => { 
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

// @desc logout user
// @routes POST /api/v1/stackoverflow/users/logout
// @access Private
exports.logoutUser = asyncHandler(async (req, res, next) => { 
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// @desc update a bootcamp
// @routes PUT /api/v1/bootcamps/:id
// @access Private
exports.updateUser = asyncHandler(auth, async (req, res, next) => { 
    // res.send(req.user)
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    if(!bootcamp){
        return res.status(400).json({success: false})
    }

    res.status(200).json({ success: true, data: bootcamp})
})

// @desc Delete a bootcamp
// @routes  DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteUser = asyncHandler(async (req, res, next) => { 
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if(!bootcamp){
        return res.status(400).json({success: false})
    }

    res.status(200).json({ success: true, data: {}})
})