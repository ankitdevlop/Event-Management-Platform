const express = require('express');
const router = express.Router();
const EventController = require('../controller/event');
const jwtTokenVerify = require('../middleware/jwtTokenVerify');



router.post("/createEvent" ,jwtTokenVerify,  EventController.createEvent);
router.get("/getEvent" ,jwtTokenVerify,  EventController.getEvent);
router.get("/getEventById" ,jwtTokenVerify,  EventController.getEventById);
router.put("/updateEvent" ,jwtTokenVerify,  EventController.updateEvent);
router.delete("/deleteEvent" ,jwtTokenVerify,  EventController.deleteEvent);
router.get("/attendEvent" ,jwtTokenVerify,  EventController.attendEvent);

module.exports = router;
