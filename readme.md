Event
This is an API to create and retrieve events(complete list as well as based on filters).

POST
Create Events
localhost:3000/createEvent
Create event is route used to register events. The format of parameters passed should be: { "email" : String type", "environment" : Value can be prod/dev/stage/test only, "component" : "String type", "message" : "String type", "amount" : "Number type" }

Bodyraw (json)
json
{
  "email": "refd@java.com",
  "environment": "prod",
  "component": "inventory",
  "message": "Order placed successfully for faahoo",
  "data": {
    "amount": 630
  }
}
GET
FetchEvents
localhost:3000/fetchEvents
This route is used to retrieve all events stored. No sort of parameters from user required.

GET
FetchEventsByFilter
localhost:3000/fetchEvents/filter
This route is basically used to filter out events based on below parameters: { "email": String type, "environment": prod/test/stage/dev only, "component": String type, "message": String type, "created At ": Date type (greater than or equal to you wish for) }

Bodyraw (json)
json
{
  "email": "refd@java.com",
  "environment": "prod",
  "component": "inventory",
  "message": "Order placed successfully for faahoo",
  "createdAt": "30-09-2021"
}