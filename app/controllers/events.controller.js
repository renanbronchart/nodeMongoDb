const Event = require('../models/event');

module.exports = {
  showEvents: showEvents,
  showSingleEvent: showSingleEvent,
  seedEvents: seedEvents,
  showCreate: showCreate,
  processCreate: processCreate
}

//
// show all events
//
function showEvents(req, res) {
  // get all events

  Event.find({}, (err, events) => {
    if (err) {
      res.status(404);
      res.send('Events not found !')
    }

  res.render('pages/events', {events: events});

  })

  // return a view with data

}


//
// show single event
//
function showSingleEvent(req, res) {
  Event.findOne({ slug : req.params.slug }, (err, event) => {
    if (err) {
      res.status(404);
      res.send('Events not found !')
    }

    res.render('pages/single', { event: event });

  });

}


//
// seed our database
//
function seedEvents(req, res) {
  // ceate some events
  const events = [
    {name: 'Basketball', description: 'a basket'},
    {name: 'Swimming', description: 'Michael Phelps is a champions'},
    {name: 'Weightlifting', description: 'Lifting heavy'},
    {name: 'judojusjistu', description: 'Jigoro kano has invented this game'}
  ];


  // use the Event model to insert/save
  Event.remove({}, () => {
    for (event of events) {
      var newEvent = new Event(event);

      newEvent.save();
    }
  })


  //seeded
  res.send('Database seeded')
}


function showCreate(req, res) {
  res.render('pages/create')
}

function processCreate(req, res) {
  const event = new Event({
    name: req.body.name,
    description: req.body.description
  });


  event.save((err) => {
    if (err) {
      throw err;
    }
    // redirect to the
    res.redirect(`/events/${event.slug}`)
  })

}

