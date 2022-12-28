const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config({ path: './db.js'})

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/stackoverflow-lite', {
        useNewUrlParser: true,
        useUnifiedTopology : true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`)
}

module.exports = connectDB