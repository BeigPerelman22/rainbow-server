const express = require("express");
var cors = require('cors')
const app = express();

app.use( '/', express.static(__dirname + '/client/login'));
app.use( '/home', express.static(__dirname + '/client/home'));
app.use(cors({origin:"*"}));
const http = require('http').Server(app);
var request = require('request');
var bodyParser = require('body-parser')
const path = require('path');
var jsonParser = bodyParser.json()
const port = 3000;

const dbComponent = require('./db')
const googleComponent = require('./google')

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  
    apiKey: "AIzaSyB_tonwz7aQZSRbz6wIxxcCl1qWeWDNB3Y",
    authDomain: "rainbow-server-6a19e.firebaseapp.com",
    projectId: "rainbow-server-6a19e",
    storageBucket: "rainbow-server-6a19e.appspot.com",
    messagingSenderId: "957306084767",
    appId: "1:957306084767:web:30d0891cd93737091bb1aa",
    measurementId: "G-LRVXHC00G4"
  
};

// Initialize Firebase
const serviceAccount = "firebase-adminsdk-g5mf4@rainbow-server-6a19e.iam.gserviceaccount.com"
// authDomain: "rainbow-server-6a19e.firebaseapp.com",
// projectId: "rainbow-server-6a19e",
// storageBucket: "rainbow-server-6a19e.appspot.com",
// messagingSenderId: "957306084767",
// appId: "1:957306084767:web:30d0891cd93737091bb1aa",
// measurementId: "G-LRVXHC00G4"}

// initializeApp({
//   credential: cert(serviceAccount)
// });

// const db = getFirestore();


// Initialize Cloud Firestore and get a reference to the service
// const db = firebase.firestore();

// db.collection("users").add({
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815
// })
// .then((docRef) => {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//   console.error("Error adding document: ", error);
// });
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/login/index.html');
})


app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/client/home/index.html');
})


app.get('/calendar/events', jsonParser, async(req, res) => {
  console.log("hi")
 let getE =await  googleComponent.google.getEvents(req.body);

 if (getE==400){
  console.log(getE)
  res.status(400).end();
}
else{
  console.log(getE)
  res.send(getE)
}
 
 
});

app.post('/calendar/newevent', jsonParser,async (req, res) => {
  let addE = await googleComponent.google.addEvent(req)

  if (addE==400){
    // console.log(addE)
    res.status(400).end();
  }
  else{
    // console.log(addE)
    res.send(addE)
  }
 
});

app.put('/calendar/updateevent', jsonParser, async(req, res) => {
  let update =await googleComponent.google.updateEvent(req)

  if (update==400){
    // console.log(addE)
    res.status(400).end();
  }
  else{
    // console.log(addE)
    res.send(update)
  }
  
  // let location = req.body.location || null;
  // let summary = req.body.summary || null;
  // let colorId = req.body.colorId ||null

  // var options = {
  //   method: 'put',
  //   url: `https://www.googleapis.com/calendar/v3/calendars/${req.body.calenderId}/events/${req.body.eventId}`,
  //   headers: {
  //     Authorization: `Bearer ${req.body.token}`,
  //     // ya29.a0AVvZVso81Yl06-Uj60GWDgcDb_3U8kqEbiarAkz3uAUFZL7LEpVb5K0xa19X3VuzyuT2gvV3ONYG9Fg3uSy30sdXkP8bhckuefHJMhQM_BI4f3nvbFNlgO4UrRE82V48xnCRg_7Se4xsN2pCDqVuHi0pJnNCRwaCgYKAZYSARESFQGbdwaIHUMYDx70xqovRqYdUQWZ7Q0165'
  //   },
  //   body: JSON.stringify({
  //     start: {
  //       dateTime: req.body.startTime,
  //       timeZone: 'Asia/Jerusalem',
  //     },
  //     end: {
  //       dateTime: req.body.endTime,
  //       timeZone: 'Asia/Jerusalem',
  //     },
  //     location: location,
  //     summary: summary,
  //     colorId:colorId
  //   }),
  // };

  // request(options, function (error, response) {
  //   if (error) throw new Error(error);
  //   console.log(response.body);
  //   res.send(response.body);

  // });
});

app.delete('/calendar/deleteevent', jsonParser,async (req, res) => {

  let deleteE = await googleComponent.google.deleteEvent(req.body)
 await console.log(JSON.stringify(deleteE))

  if (deleteE==400){
    console.log(deleteE)
    res.status(400).end();
  }
  else{
    console.log(deleteE)
    res.send(deleteE)
  }
  // var options = {
  //   method: 'DELETE',
  //   url: `https://www.googleapis.com/calendar/v3/calendars/${req.body.calenderId}/events/${req.body.eventId}`,
  //   headers: {
  //     Authorization: `Bearer ${req.body.token}`,
  //   },
  // };
  // request(options, function (error, response) {
  //   if (error) throw new Error(error);
  //   console.log(response.body);
  //   res.send(response.body);
  // });
});

http.listen(port, () => {
    app.get(function (req, res) {
        res.sendFile();
    });
  console.log(`Mock pos listening on port ${port}`)
})
    


