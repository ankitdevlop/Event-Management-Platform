const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventImage: {
        type: String
    },
    category: {
        type: String
    },
    attendedPeople: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    duration: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
