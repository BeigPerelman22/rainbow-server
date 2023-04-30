const express = require('express');
var cors = require('cors');
const app = express();

app.use('/', express.static(__dirname + '/client/login'));
app.use('/home', express.static(__dirname + '/client/home'));
app.use(cors({ origin: '*' }));
const http = require('http').Server(app);
var request = require('request');
var bodyParser = require('body-parser');
const path = require('path');
var jsonParser = bodyParser.json();
const port = 3000;

const dbComponent = require('./db');
const googleComponent = require('./google');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/login/index.html');
});

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/client/home/index.html');
});

app.get('/calendar/events', jsonParser, async (req, res) => {
  // console.log('hi');
  let getE = await googleComponent.google.getEvents(req.body);
  let eve = await dbComponent.db.getEvents('events',req.body)

  const filteredEvents = getE.filter(calendarEvent => {
    // Only return events with the same id as an event in Firestore
    return eve.some(firestoreEvent => {
      return firestoreEvent.id === calendarEvent.id;
    });
  });

  const r = await getE.filter((elem) => !eve.find(({ id }) => elem.id == id));
console.log("the filter is : "+ JSON.stringify(filteredEvents))
  if ( eve == 400) {
    // console.log(getE)
    res.status(400).end();
  } else {
    // eve.forEach(doc => {
    //   console.log(doc.id, '=>', doc.data());
    // });
    

  //  await console.log(getE)
    res.send(filteredEvents);
  }
});

app.post('/calendar/newevent', jsonParser, async (req, res) => {
  let addE = await googleComponent.google.addEvent(req);
  
  // console.log(addInDB)
  if (addE == 400) {
    // console.log(addE)
    res.status(400).end();
  } else {
    console.log(addE)
    const newBody = {
      id: addE.id,
      ...req.body
    }  
   await dbComponent.db.addEvent("events",newBody)
    // console.log(addE)
    res.send(addE);
  }
});

app.put('/calendar/updateevent', jsonParser, async (req, res) => {
  let update = await googleComponent.google.updateEvent(req);

  if (update == 400) {
    // console.log(addE)
    res.status(400).end();
  } else {
    await dbComponent.db.updateEvents("events",req.body)
    // console.log(addE)
    res.send(update);
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
