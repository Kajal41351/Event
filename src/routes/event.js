const express = require('express')
var ObjectId = require('mongodb').ObjectID;
const { events, findOneAndUpdate } = require('../model/event')
const router = express.Router()    //Create router as a seperate module and can later use in another file.
const eventModel =  require('../model/event')

// router.get('/',(req,res)=>{
//   res.render('index')
// })

router.post('/createEvent',async (req,res)=>{
   const Event = new eventModel(req.body)
   Event.data.orderId = Event._id
   try{
       await Event.save()
       res.status(201).send('Event created successfully.')
   }catch(e){
       res.status(400).send(e.toString())
   }
})

router.get('/fetchEvents',async(req,res)=>{
    try{
      const events = await eventModel.find({},{"updatedAt":false,"__v":false})
      res.send(events)
    }catch(e){
      res.status(500).send(e)
    }
})

router.get('/fetchEvents/filter',async(req,res)=>{
    try{
        const eventsByFilter = await eventModel.findByFilters(req.body)
        res.send(eventsByFilter)
     }catch(e){
        res.status(400).send(e.toString())
     }
})
module.exports = router