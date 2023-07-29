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
const drive = require('./drive');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const mime = require('mime-types');
const e = require('express');
app.get('/', (req, res) => {
  console.log("dsadas")
 res.sendFile(__dirname + '/client/login/index.html');
});

app.use(fileUpload({
  useTempFiles : true,
}));
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/client/home/index.html');
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

// app.post('/upload', async (req, res) => {
  async function up(req) {
  console.log(req.headers.token)
  let newReq;
  if(req.files){
    if (req.files.pdf){
       fileContent =await fs.createReadStream(req.files.pdf.tempFilePath);
       nameCo =await fs.createReadStream(req.files.name.tempFilePath);
    }
    console.log("file")
    idFile =await drive.drive.upFile(fileContent,req.headers.token,nameCo)
    idFile = await JSON.parse(idFile)
    // await console.log("sadas" +idFile)
    // fileLink = await drive.drive.getlinkFile(idFile)
  
    if (idFile !==400)  {
      newReq = {
        attachments:[ {
          fileUrl: idFile.webViewLink, // הקישור לצפייה בקובץ בדרייב
          mimeType: idFile.mimeType,
          title: idFile.name,
        }]
       ,
       ...req.headers
     }
   }
   }
console.log(JSON.stringify(newReq))
return newReq
  //  res.send(newReq)
// });
  }

app.post('/calendar/newevent', jsonParser, async (req, res) => {
  let newReq;
  let bodyFile;
  if(req.files){
    bodyFile = await up(req)
  //   console.log("file")
  //   idFile =await drive.drive.upFile(req.headers.token,req.file.file,req.file.name)
  //   fileLink = await drive.drive.getFileLink(idFile)
  //   if (fileLink !==400)  {
  //     newReq = {
  //      attachments: [
  //        {
  //          fileUrl: fileLink.webViewLink, // הקישור לצפייה בקובץ בדרייב
  //          mimeType: fileLink.mimeType,
  //          title: fileLink.data.name,
  //        },
  //      ],
  //      ...req.headers
  //    }
  //  }

  // let newReq;
  // if(req.files){
  //     if (req.files.pdf){
  //       fileContent =await fs.createReadStream(req.files.pdf.tempFilePath);
  //       nameCo =await fs.createReadStream(req.files.name.tempFilePath);
  //     }
  //     console.log("file")
  //     idFile =await drive.drive.upFile(fileContent,req.headers.token,nameCo)
  //     idFile = await JSON.parse(idFile)
  //     // await console.log("sadas" +idFile)
  //     // fileLink = await drive.drive.getlinkFile(idFile)
    
  //     if (idFile !==400)  {
  //       newReq = {
  //         attachments:[ {
  //           fileUrl: idFile.webViewLink, // הקישור לצפייה בקובץ בדרייב
  //           mimeType: idFile.mimeType,
  //           title: idFile.name,
  //         }]
  //       ,
  //       ...req.headers
  //     }
  //   }
  //   else{
  //     newReq = {
  //       ...req.headers
  //     }
  //   }
  //   }
   }

  // let upFileTodrive = await drive.drive.upToDrive(req)
  // newReq = await JSON.parse(newReq)
//  await console.log("newReq", bodyFile);
  let eventAsString = await googleComponent.google.addEvent(bodyFile, req.headers.calendarid, req.headers.token);
  eventAsString = await JSON.parse(eventAsString)
   await console.log("eventAsString" + eventAsString.id)
    let event = eventAsString
    if (eventAsString == 400) {
        res.status(400).end();
    } else {
        // console.log("event", event);

        const newBody = {
          id: eventAsString.id,
          caregiverDetails: "test",
          isTookPlace: false,
          hasReceipt: true,
          isSubmitted: false,
          isMoneyRefund: true,
          calendarId: req.headers.calendarid,
          startTime:  eventAsString.start.dateTime,
          endTime:  eventAsString.end.dateTime,
          summary: event.summary,
          location: event.location,
          // eventDescription: event.description,
          attachments:event.attachments,
          
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

http.listen(port, () => {
    app.get(function (req, res) {
        res.sendFile();
    });
    console.log(`Mock pos listening on port ${port}`);
})
