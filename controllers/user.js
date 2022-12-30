const asyncHandler = require('../middleware/async')
const auth = require('../middleware/auth')
const User = require('../models/User')

// @desc register user
// @routes POST /api/v1/auth/register
// @access Private
exports.registerUser = asyncHandler(async (req, res, next) => { 
    const { name, email, password } = req.body
    const user = await User.create({
        name,
        email,
        password
    })

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).json({ user, token })
    } catch (e) {
        res.status(400).send({ sucess: false })
    }
})

// @desc login user
// @routes POST /api/v1/auth/login
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => { 
    // validate email and password
    if(!req.body.email || !req.body.password){
        return next(new Error('Please enter an email and password', 400))
    }

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        sendTokenResponse(user, 200, res)
    } catch (e) {
        res.status(400).send()
    }
})

// @desc logout user
// @routes POST /api/v1/auth/logout
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

// Get token from model, create cookie and send response
const sendTokenResponse =  async (user, statusCode, res ) => {
    // Create token
    const token = await user.generateAuthToken()

    // create cookie
    const options =  {
        expires:new Date(Date.now() + 30 * 24 * 60 * 60 * 100),
        httpOnly: true,
    }

    if(process.env.NODE_ENV === 'production'){
        options.secure = true
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            user,
            success: true,
            token
        });
}

// @desc update a bootcamp
// @routes PUT /api/v1/bootcamps/:id
// @access Private
// exports.updateUser = asyncHandler(auth, async (req, res, next) => { 
//     // res.send(req.user)
//     const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//     })
//     if(!bootcamp){
//         return res.status(400).json({success: false})
//     }

//     res.status(200).json({ success: true, data: bootcamp})
// })

// @desc Delete a bootcamp
// @routes  DELETE /api/v1/bootcamps/:id
// @access Private
// exports.deleteUser = asyncHandler(async (req, res, next) => { 
//     const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

//     if(!bootcamp){
//         return res.status(400).json({success: false})
//     }

//     res.status(200).json({ success: true, data: {}})
// })