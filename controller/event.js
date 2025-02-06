
const moment = require('moment');
const md5 = require('md5');
const userModel = require("../model/userModel");
const EventModel = require("../model/eventModel");
var dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
});

const broadcastAttendees = async (eventId) => {
    const event = await EventModel.findById(eventId);
    if (event) {
        const attendeeCount = event.attendedPeople.length;
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ eventId, attendeeCount }));
            }
        });
    }
};

module.exports = {
    createEvent:async (req, res) => {
        try {
            const { eventName, eventDescription, eventImage, duration } = req.body;
            const createdBy = req.auth.userId;
            console.log('req.user', req.body)
    
            if (!eventName || !eventDescription || !duration) {
                return res.status(400).json({ error: "All fields are mandatory" });
            }
    
            const event = new EventModel({
                eventName,
                eventDescription,
                eventImage,
                duration,
                createdBy,
                category,
                attendedPeople: []
            });
            await event.save();
    
            res.status(201).json({ message: "Event created successfully", event });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getEvent:async (req, res) => {
        try {
            const { category, startDate, endDate } = req.query;
            let filter = {};

            if (category) {
                filter.category = category;
            }
            if (startDate && endDate) {
                filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
            }

            const events = await EventModel.find(filter);
            res.status(200).json({ events });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getEventById:async (req, res) => {
        try {
            const { eventId } = req.query;
            const event = await EventModel.findById(eventId);
    
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }
    
            res.status(200).json({ event });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
   updateEvent: async (req, res) => {
        try {
            const { _id } = req.query;
            const { eventName, eventDescription, eventImage, duration } = req.body;
            
            const event = await EventModel.findByIdAndUpdate(_id, {
                eventName,
                eventDescription,
                eventImage,
                duration
            }, { new: true });
            console.log('event', event)
    
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }
    
            res.status(200).json({ message: "Event updated successfully", event });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    deleteEvent:async (req, res) => {
        try {
            const { _id } = req.query;
            const event = await EventModel.findByIdAndDelete(_id);
    
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }
    
            res.status(200).json({ message: "Event deleted successfully" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    attendEvent:async (req, res) => {
        try {
            const { eventId } = req.params;
            const userId = req.user.userId;
    
            const event = await EventModel.findById(eventId);
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }
    
            if (!event.attendedPeople.includes(userId)) {
                event.attendedPeople.push(userId);
                await event.save();
                broadcastAttendees(eventId);
            }
    
            res.status(200).json({ message: "Successfully attended event" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};