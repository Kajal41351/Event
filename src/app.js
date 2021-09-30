const path = require('path')
const express = require('express')
require('./db/mongoose')
const eventRouter = require('./routes/event')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')

app.set('view engine','hbs')
app.set('views',viewPath)
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(eventRouter)

app.listen(port,()=>{
    console.log('Server is up and running on port:' + port)
}) 


//API documentation
//URL : https://documenter.getpostman.com/view/17571132/UUy1gT6P

//Business Logic
//Business logic can reside as a sepearte module in src/controller if need
//similar to like we setup route individually in different module.

//Handling multiple request can be done by load balancing using AWS.