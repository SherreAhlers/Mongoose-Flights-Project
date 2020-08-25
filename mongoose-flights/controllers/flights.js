const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    show,
    new: newFlight,
    create
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', { title: 'All Flights', flights });
    });
};

function show(req, res) {
    Flight.findById(req.params.id)
        .exec(function(err, flight) {
            Ticket.find({ flight: flight._id }, function(err, tickets) {
                console.log(tickets);
                console.log(flight);
                res.render('flights/show', { title: 'Flight Detail', flight, tickets });
            });
        });
}

function newFlight(req, res) {
    res.render('flights/new', { title: 'New Flight' });
};

function create(req, res) {
    req.body.stillAvailable = !!req.body.stillAvailable;
    req.body.departs = req.body.departs.replace('yyyy-MM-ddThh:mm');
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.redirect('flights/new');
        console.log(flight);
        res.redirect(`/flights/${flight._id}`);
    });
};