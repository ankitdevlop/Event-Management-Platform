const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment =require('moment')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    eventsAttended: {
        type: Object,
        default: {}
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: String,
        default: () => moment().format()
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
