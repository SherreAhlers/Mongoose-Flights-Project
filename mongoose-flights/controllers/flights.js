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
        .populate('tickets').exec(function(err, flight) {
            Ticket.find({ _id: { $nin: flight.tickets } }, function(err, tickets) {
                console.log(tickets);
                res.render('tickets/show', { title: 'Flight Detail', flight, tickets });
            });
        });
}

function newFlight(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    res.render('flights/new', { title: 'Add Flight' });
};

function create(req, res) {
    req.body.stillAvailable = !!req.body.stillAvailable;
    req.body.departs = req.body.departs.replace('yyyy-MM-ddThh:mm');
    // if (req.body.departs) req.body.departs = req.body.departs.split(',');
    // for (let key in req.body) {
    //     if (req.body[key] === '') delete req.body[key];
    // }
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.redirect('flights/new');
        console.log(flight);
        res.redirect(`/flights/${flight._id}`);
    });
};