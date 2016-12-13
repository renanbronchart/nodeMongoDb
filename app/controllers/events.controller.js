const Event = require('../models/event');

module.exports = {
  showEvents: showEvents,
  showSingleEvent: showSingleEvent,
  seedEvents: seedEvents,
  showCreate: showCreate,
  processCreate: processCreate,
  showEdit: showEdit,
  processEdit: processEdit,
  deleteEvent: deleteEvent
}

//
// show all events
//
function showEvents(req, res) {
  Event.find({}, (err, events) => {
    if (err) {
      res.status(404);
      res.send('Events not found !')
    }

  res.render('pages/events', {
    events: events,
    success: req.flash('success')
  });

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

    res.render('pages/single', {
      event: event,
      success: req.flash('success')
    });

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
  res.render('pages/create', {
    errors: req.flash('errors')
  })
}

function processCreate(req, res) {
  // validate information
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('description', 'description is also required').notEmpty();

  // if there are errors, redirect and save errors flash
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/events/create');
  }


  // create event
  const event = new Event({
    name: req.body.name,
    description: req.body.description
  });


  event.save((err) => {
    if (err) {
      throw err;
    }

    // set a successful flash message
    req.flash('success', 'succesfuly created event!');

    // redirect to the
    res.redirect(`/events/${event.slug}`)
  })

}

function showEdit(req, res) {
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    if (err) {
      res.status(404);
      res.send('Events not found !')
    }


    res.render('pages/edit', {
      event: event,
      errors: req.flash('errors')
    });
  })
}



function processEdit(req, res) {
  // validate information
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('description', 'description is also required').notEmpty();

  // if there are errors, redirect and save errors flash
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/events/${req.params.slug}/edit`);
  }


 // finding a current event
 Event.findOne({ slug: req.params.slug }, (err, event) => {
  event.name = req.body.name;
  event.description = req.body.description;


  event.save((err) => {
    if (err) {
      throw err;
    }

    req.flash('success', 'successfuly updating event');
    res.redirect('/events');
  })
 })

 // updating that event


 // success flash message


 //redirect back to the event
}




function deleteEvent(req, res) {
  Event.remove({ slug: req.params.slug }, (err) => {
    req.flash('success', 'Your are deleted this event');
    res.redirect('/events');
  })
}
