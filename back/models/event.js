//dependency
//jshint esversion: 8
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
//user schema
const eventSchema = new Schema({
    price: {
        type:Number,
        required: true
    },
    membersCount: {
        type:Number,
        required: true,
    },
    eventName:{
        type:String,
        unique: true
    },
    response: {
        type: Boolean,
        default: true
    },
    launched: {
        type: Boolean,
        default: false
    },
    paid:[
        {
                type: Schema.Types.ObjectId,
                ref: "Team"
        }
    ]
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Event',eventSchema);
