const express = require('express');
const connectDB = require('./db');


const app = express();
const PORT = process.env.PORT || 3000;

// body parser
app.use(express.json())

connectDB()

app.listen(
    PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);