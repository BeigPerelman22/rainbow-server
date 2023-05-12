const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors({ origin: '*' }));
const http = require('http').Server(app);
var request = require('request');
var bodyParser = require('body-parser');
const path = require('path');
var jsonParser = bodyParser.json();
const port = 3000;

const dbComponent = require('./db');
const googleComponent = require('./google');

app.post('/calendar/events', jsonParser, async (req, res) => {
    let googleEvents = await googleComponent.google.getEvents(req.body);
    let events = await dbComponent.db.getEvents('events',req.body)

    if (events == 400) {
        res.status(400).end();
    }
    res.send(events);
});

app.post('/calendar/newevent', jsonParser, async (req, res) => {
    let eventAsString = await googleComponent.google.addEvent(req);
    let event = JSON.parse(eventAsString);

    if (event == 400) {
        res.status(400).end();
    } else {
        console.log("event", event);

        const newBody = {
          id: event.id,
          caregiverDetails: "test",
          isTookPlace: false,
          hasReceipt: true,
          isSubmitted: false,
          isMoneyRefund: true,
          ...req.body
        }

        await dbComponent.db.addEvent("events",newBody)
        res.send(event);
    }
});

app.put('/calendar/updateevent', jsonParser, async (req, res) => {
    let update = await googleComponent.google.updateEvent(req);
    if (update == 400) {
        res.status(400).end();
    } else {
        let event = await dbComponent.db.updateEvents("events",req.body)
        res.send(event);
    }
});

app.delete('/calendar/deleteevent', jsonParser, async (req, res) => {
    let deleteE = await googleComponent.google.deleteEvent(req.body);
    await console.log(JSON.stringify(deleteE));

    if (deleteE == 400) {
        console.log(deleteE);
        res.status(400).end();
    } else {
        console.log(deleteE);
        res.send(deleteE);
    }
});

http.listen(port, () => {
    app.get(function (req, res) {
        res.sendFile();
    });
    console.log(`Mock pos listening on port ${port}`);
});
