const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS',
            'DFW',
            'DEN',
            'LAX',
            'SAN'
        ],
        required: true
    },
    arrival: { type: Date, required: true }
}, {
    timestamps: true
});

const flightSchema = new Schema({
    airline: { type: String, required: true, enum: ['American', 'Delta', 'Southwest', 'United'] },
    airport: { type: String, required: true, enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN'] },
    flightNo: { type: Number, required: true, min: 10, max: 9999 },
    departs: { type: Date, required: true },
    stillAvailable: { type: Boolean, default: true },
    destinations: [destinationSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);