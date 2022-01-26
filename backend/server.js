const express = require('express')

const app = express()

app.get('/', (req, res)=>{
    res.json({message : "I'm running buddy"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log("Server running...")
})