const express = require('express');
const connectDB = require('./db');
// const stackoverflow = require('./routes/answer')
const user = require('./routes/user')

const app = express();
const PORT = process.env.PORT || 3000;

// body parser
app.use(express.json())
app.use('api/v1/stackoverflow', user)
// app.use('api/v1/stackoverflow', )

connectDB()

app.listen(
    PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);