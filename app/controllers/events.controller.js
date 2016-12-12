module.exports = {
  showEvents: (req, res) => {
    // create dummy events
    const events = [
      {name: 'Basketball', slug: 'basketball', description: 'a basket'},
      {name: 'Swimming', slug: 'swimming', description: 'Michael Phelps is a champions'},
      {name: 'Weightlifting', slug: 'Weightlifting', description: 'Lifting heavy'}
    ];

    // return a view with data

    res.render('pages/events', {events: events});
  },


  // show single event
  showSingleEvent: (req, res) => {
    const event = {name: 'Basketball', slug: 'basketball', description: 'a basket'};

    res.render('pages/single', { event: event });
  }
}
