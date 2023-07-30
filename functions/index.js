
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbComponent = require('./main/db');
const googleComponent = require('./main/google');
var jsonParser = bodyParser.json();
const fs = require('fs');
const mime = require('mime-types');
const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
const drive = require('./main/drive');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const upload = multer().any();
app.use(fileUpload({
  useTempFiles : true,
}));


app.get('/', (req, res) => {
  // console.log("dsadas")
//  res.sendFile(__dirname + '/client/login/index.html');
res.send("success")
});




app.get('/calendar/events', jsonParser, async (req, res) => {

  console.log(req.body)
  console.log(req.headers)
 
  let getE = await googleComponent.google.getEvents(req.headers.calendarid, req.headers.token,req.headers.timemin,req.headers.timemax);
  let eve = await dbComponent.db.getEvents('events', req.headers.calendarid)


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


app.post('/calendar/newevent',upload, jsonParser, async (req, res) => {

  console.log(req.body)
  let newReq;
  let bodyFile= req.body
  // if (req.body) {
  //   bodyFile = await up(req)
  
  //  }
  //  else{
  //   bodyFile = req.body
  //  }

  // let upFileTodrive = await drive.drive.upToDrive(req)
  // newReq = await JSON.parse(newReq)
 await console.log("newReq", bodyFile);
  let eventAsString = await googleComponent.google.addEvent(req.body, req.headers.calendarid, req.headers.token);
  eventAsString = await JSON.parse(eventAsString)
  //  await console.log("eventAsString" + eventAsString.id)
    let event = eventAsString
    if (eventAsString == 400) {
        res.status(400).end();
    } else {
        // console.log("event", event);

        const newBody = {
          id: eventAsString.id,
          caregiverDetails: "test",
          isTookPlace: bodyFile.isTookPlace || false,
          hasReceipt: bodyFile.hasReceipt || false,
          isSubmitted: bodyFile.isSubmitted|| false,
          isMoneyRefund: bodyFile.isMoneyRefund|| false,
          calendarId: req.headers.calendarid,
          startTime:  eventAsString.start.dateTime,
          endTime:  eventAsString.end.dateTime,
          summary: event.summary,
          location: event.location || "",
          // eventDescription: event.description,
          attachments:event.attachments || [],
          
        }
        console.log("newBody", newBody);
        let eventDB =await dbComponent.db.addEvent("events",newBody)
        res.send(eventDB);
    }
});

app.put('/calendar/updateevent', jsonParser, async (req, res) => {
  let update = await googleComponent.google.updateEvent(req, req.headers.calendarid, req.headers.token);
    if (update == 400) {
        res.status(400).end();
    } else {
      let event = await dbComponent.db.updateEvent("events",req.body.id,{...req.body, calendarId: req.headers.calendarid})
        res.send(event);
    }
});

app.delete('/calendar/deleteevent', jsonParser, async (req, res) => {
  let deleteE = await googleComponent.google.deleteEvent(req.query.id, req.headers.calendarid, req.headers.token);
    await console.log(JSON.stringify(deleteE));

    if (deleteE == 400) {
        console.log(deleteE);
        res.status(400).end();
    } else {
      console.log("delted " + deleteE)
      let event = await dbComponent.db.deleteEvent("events",req.query.id)
      res.send(event);
    }
});

exports.app = functions.https.onRequest(app);



