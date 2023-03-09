const express = require("express");

const app = express();
app.use(express.static('../main'));
const http = require('http').Server(app);
// const io = require('socket.io')(http);
var request = require('request');
var bodyParser = require('body-parser')
const path = require('path');
var jsonParser = bodyParser.json()
const port = 773;
const i = process.env.I
// let only = require('./onlyRequired.json')
// let data = require('./../data.json')
// const path = require('path');
// const mongo = require('mongodb');





// app.get('/welocim', (req, res) => {
  
//     res.sendFile(path.join(__dirname, 'main','style.css'));
  
//   })
//   app.get('/', (req, res) => {
  
//     res.sendFile(path.join(__dirname, 'main','index.html'));
  
//   })





//   app.get('/google/calendar' ,(req, res) => {
//     // listEvents(auth) {
        
//         var options = {
//         'method': 'GET',
//         'url': 'https://www.googleapis.com/calendar/v3/calendars/levi7701414@gmail.com/events',
//         'headers': {
//             'Authorization': 'Bearer ya29.a0AVvZVso81Yl06-Uj60GWDgcDb_3U8kqEbiarAkz3uAUFZL7LEpVb5K0xa19X3VuzyuT2gvV3ONYG9Fg3uSy30sdXkP8bhckuefHJMhQM_BI4f3nvbFNlgO4UrRE82V48xnCRg_7Se4xsN2pCDqVuHi0pJnNCRwaCgYKAZYSARESFQGbdwaIHUMYDx70xqovRqYdUQWZ7Q0165'
//         }
//         };
//         request(options, function (error, response) {
//         if (error) throw new Error(error);
//         console.log(response.body);
//         res.send (response.body)
//         // return response.body;
//         });
    
//         })


        app.get('/calendar/events' ,jsonParser,(req, res) => {
    // listEvents(auth) {
        console.log(req.body.token)
        var options = {
        'method': 'GET',
        'url': `https://www.googleapis.com/calendar/v3/calendars/${req.body.calenderID}/events`,
        'headers': {
            'Authorization': `Bearer ${req.body.token}`
            // 'Bearer ya29.a0AVvZVso81Yl06-Uj60GWDgcDb_3U8kqEbiarAkz3uAUFZL7LEpVb5K0xa19X3VuzyuT2gvV3ONYG9Fg3uSy30sdXkP8bhckuefHJMhQM_BI4f3nvbFNlgO4UrRE82V48xnCRg_7Se4xsN2pCDqVuHi0pJnNCRwaCgYKAZYSARESFQGbdwaIHUMYDx70xqovRqYdUQWZ7Q0165'
        }
        };
        request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.send (response.body)
        // return response.body;
        });
    
        })

        app.post('/calendar/newevent' ,jsonParser,(req, res) => {
            // listEvents(auth) {
                
                var options = {
                'method': 'post',
                'url': `https://www.googleapis.com/calendar/v3/calendars/${req.body.calenderID}/events`,
                'headers': {
                    'Authorization': `Bearer ${req.body.token}`
                    // ya29.a0AVvZVso81Yl06-Uj60GWDgcDb_3U8kqEbiarAkz3uAUFZL7LEpVb5K0xa19X3VuzyuT2gvV3ONYG9Fg3uSy30sdXkP8bhckuefHJMhQM_BI4f3nvbFNlgO4UrRE82V48xnCRg_7Se4xsN2pCDqVuHi0pJnNCRwaCgYKAZYSARESFQGbdwaIHUMYDx70xqovRqYdUQWZ7Q0165'
                },
                body: JSON.stringify({
                    "start": {
                      "dateTime": req.body.startTime,
                      "timeZone": "Asia/Jerusalem"
                    },
                    "end": {
                      "dateTime": req.body.entTime,
                      "timeZone": "Asia/Jerusalem"
                    },
                    // "location":req.body.location || "",
                    // "summary":req.body.summary || "",
                    // "icon":req.body.icon || ""
                  })
                
                };
                
                request(options, function (error, response) {
                if (error) throw new Error(error);
                console.log(response.body);
                res.send (response.body)
                // return response.body;
                });
            
                })


http.listen(port, () => {
    app.get(function (req, res) {
        res.sendFile();
    });
  console.log(`Mock pos listening on port ${port}`)
})
    


