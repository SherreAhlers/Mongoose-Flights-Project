const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
    addToTicket
};

function addToTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.tickets.push(req.body.ticketId);
        ticket.save(function(err) {
            res.redirect(`/flights/${flight._id}`);
        });
    });
}

function create(req, res) {
    // Need to "fix" date formatting to prevent day off by 1
    // This is due to the <input type="date"> returning the date
    // string in this format:  "YYYY-MM-DD"
    // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
    // const s = req.body.born;
    // req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
    Ticket.create(req.body, function(err, ticket) {
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