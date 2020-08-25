const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
    addToTicket
};

function addToTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        let ticket = new Ticket();
        ticket.seat = req.body.seat;
        ticket.price = req.body.price;
        ticket.flight = req.params.id
            // flight.tickets.push(req.body.ticketId);
        ticket.save(function(err) {
            res.redirect(`/flights/${flight._id}`);
        });
    });
}

function create(req, res) {
    Ticket.create(req.body, function(err, ticket) {
        console.log(ticket)
        res.redirect('/tickets/new');
    });
}

function newTicket(req, res) {
    Ticket.find({}, function(err, tickets) {
        res.render('tickets/new', {
            title: 'Add Ticket',
            tickets
        });
    })
}