const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())


// Mongoose connection
const uri = process.env.ATLAS_URI
mongoose.connect(uri)

const connection = mongoose.connection

connection.once('open', ()=>{
    console.log(`Mongodb connected...`)
})

// Getting User Router
const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.get('/', (req, res)=>{
    res.json({message : "I'm running buddy"})
})

app.listen(PORT, ()=>{
    console.log("Server running...")
})