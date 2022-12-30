const express = require('express');
const connectDB = require('./db');
const user = require('./routes/user')
const cookieParser = require('cookie-parser')

const app = express();
const PORT = process.env.PORT || 3000;

// body parser
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/auth', user)

// connect to mongodb database
connectDB()

app.listen(
    PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);