const express = require('express');

const app = express();
app.use(express.static('../public'));
const http = require('http').Server(app);
// const io = require('socket.io')(http);
var request = require('request');
var bodyParser = require('body-parser');
const path = require('path');
var jsonParser = bodyParser.json();
const port = 773;
const i = process.env.I;

const console = require('console');

app.get('/calendar/events', jsonParser, (req, res) => {
  // listEvents(auth) {
  console.log(req.body.token);
  var options = {
    method: 'GET',
    url: `https://www.googleapis.com/calendar/v3/calendars/${req.body.calenderId}/events`,
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      // 'Bearer ya29.a0AVvZVso81Yl06-Uj60GWDgcDb_3U8kqEbiarAkz3uAUFZL7LEpVb5K0xa19X3VuzyuT2gvV3ONYG9Fg3uSy30sdXkP8bhckuefHJMhQM_BI4f3nvbFNlgO4UrRE82V48xnCRg_7Se4xsN2pCDqVuHi0pJnNCRwaCgYKAZYSARESFQGbdwaIHUMYDx70xqovRqYdUQWZ7Q0165'
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    res.send(response.body);
    // return response.body;
  });
});

app.post('/calendar/newevent', jsonParser, (req, res) => {
  // listEvents(auth) {

  let location = req.body.location || null;
  let summary = req.body.summary || null;
  let colorId = req.body.colorId ||null
  
  var options = {
    method: 'post',
    url: `https://www.googleapis.com/calendar/v3/calendars/${req.body.calenderId}/events`,
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      // ya29.a0AVvZVso81Yl06-Uj60GWDgcDb_3U8kqEbiarAkz3uAUFZL7LEpVb5K0xa19X3VuzyuT2gvV3ONYG9Fg3uSy30sdXkP8bhckuefHJMhQM_BI4f3nvbFNlgO4UrRE82V48xnCRg_7Se4xsN2pCDqVuHi0pJnNCRwaCgYKAZYSARESFQGbdwaIHUMYDx70xqovRqYdUQWZ7Q0165'
    },
    body: JSON.stringify({
      start: {
        dateTime: req.body.startTime,
        timeZone: 'Asia/Jerusalem',
      },
      end: {
        dateTime: req.body.endTime,
        timeZone: 'Asia/Jerusalem',
      },
      location: location,
      summary: summary,
        colorId :colorId 
    }),
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    res.send(response.body);
    
  });
});

app.put('/calendar/updateevent', jsonParser, (req, res) => {
  

  let location = req.body.location || null;
  let summary = req.body.summary || null;
  let colorId = req.body.colorId ||null

  var options = {
    method: 'put',
    url: `https://www.googleapis.com/calendar/v3/calendars/${req.body.calenderId}/events/${req.body.eventId}`,
    headers: {
      Authorization: `Bearer ${req.body.token}`,
      // ya29.a0AVvZVso81Yl06-Uj60GWDgcDb_3U8kqEbiarAkz3uAUFZL7LEpVb5K0xa19X3VuzyuT2gvV3ONYG9Fg3uSy30sdXkP8bhckuefHJMhQM_BI4f3nvbFNlgO4UrRE82V48xnCRg_7Se4xsN2pCDqVuHi0pJnNCRwaCgYKAZYSARESFQGbdwaIHUMYDx70xqovRqYdUQWZ7Q0165'
    },
    body: JSON.stringify({
      start: {
        dateTime: req.body.startTime,
        timeZone: 'Asia/Jerusalem',
      },
      end: {
        dateTime: req.body.entTime,
        timeZone: 'Asia/Jerusalem',
      },
      location: location,
      summary: summary,
      colorId:colorId
    }),
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    res.send(response.body);
    
  });
});

app.delete('/calendar/deleteevent', jsonParser, (req, res) => {
  
  console.log(req.body.token);
  var options = {
    method: 'DELETE',
    url: `https://www.googleapis.com/calendar/v3/calendars/${req.body.calenderId}/events/${req.body.eventId}`,
    headers: {
      Authorization: `Bearer ${req.body.token}`,
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    res.send(response.body);
  });
});

http.listen(port, () => {
  app.get(function (req, res) {
    res.sendFile();
  });
  console.log(`rainbow app listening on port ${port}`);
});
