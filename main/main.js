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
app.use('/', express.static(__dirname + '/client/login'));
app.use('/home', express.static(__dirname + '/client/home'));
const dbComponent = require('./db');
const googleComponent = require('./google');
app.get('/', (req, res) => {
  console.log("dsadas")
 res.sendFile(__dirname + '/client/login/index.html');
});

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/client/home/index.html');
});


app.get('/calendar/events', jsonParser, async (req, res) => {

  // console.log(req.body)
  let getE = await googleComponent.google.getEvents(req.body);
  let eve = await dbComponent.db.getEvents('events',req.body)


  if ( getE == 400 || eve ==400 ) {
    res.status(400).end();
  } else {
    const filteredEvents = eve.filter(calendarEvent => {
      // Only return events with the same id as an event in Firestore
      return getE.some(firestoreEvent => {
        return firestoreEvent.id === calendarEvent.id;
      });
    });
    // console.log (filteredEvents)
    res.send(filteredEvents);
  }
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
        let event = await dbComponent.db.updateEvent("events",req.body.id,req.body)
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
      console.log("delted " + deleteE)
      let event = await dbComponent.db.deleteEvent("events",req.body.id)
      res.send(event);
    }
});

http.listen(port, () => {
    app.get(function (req, res) {
        res.sendFile();
    });
    console.log(`Mock pos listening on port ${port}`);
})
