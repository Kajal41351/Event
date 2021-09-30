const mongoose = require('mongoose')
const validator = require('validator')
const mongoose_unique = require('mongoose-unique-validator')

const opts = {
    timestamps :{
        createdAt : 'createdAtTimeStamp'
    }
}

const eventSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim: true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email syntax is not right.Try again!')
            }
        }       
    },
    environment :{
        type : String,
        required : true,
        enum : ['prod','dev','stage','test'],
        default:'prod'
    },
    component :{
        type : String,
        required : true,
        trim : true
    },
    message : {
        type : String,
    },
    created_at : {
        type : Date
    },
    data :{
        orderId : {
            type : String
        },
        amount:{
            type: Number,
            required : true
        },
    }
  },opts)

eventSchema.plugin(mongoose_unique)

eventSchema.statics.findByFilters = async (event)=>{
    const events = await Event.find(
    { $and : 
       [{ "email": event.email },
        { "component": event.component},
        { "environment":event.environment},
        { "createdAtTimeStamp" :{
            $gte: event.createdAt.substring(1,10)
        }
        },{ "message":{
             "$regex" : event.message
        }}]
    },{"updatedAt":false,"__v":false})
    if(events.length==0){
        throw new Error('No event found with applied filters') 
    }
    return events
}
const Event = mongoose.model('Event',eventSchema)
module.exports = Event