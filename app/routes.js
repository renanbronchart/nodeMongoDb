const express = require('express');
const router = express.Router();

const mainControllers = require('./controllers/main.controller');
const eventsControllers = require('./controllers/events.controller');

// main routes
router.get('/', mainControllers.showHome);

// events routes
router.get('/events', eventsControllers.showEvents);

// seed events
router.get('/events/seed', eventsControllers.seedEvents);

//create events

router.get('/events/create', eventsControllers.showCreate);
router.post('/events/create', eventsControllers.processCreate);


// show a single event
router.get('/events/:slug', eventsControllers.showSingleEvent);

module.exports = router;
