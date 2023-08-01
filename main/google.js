var request = require('request');
var bodyParser = require('body-parser');
const path = require('path');
var jsonParser = bodyParser.json();
const uuid = require('uuid');
// let id =  Buffer.(uuid).toString('base64');
const { google } = require('googleapis');
const { file } = require('googleapis/build/src/apis/file');

module.exports.google = {
  // Initialize Cloud Firestore and get a reference to the service
  // const db = firebase.firestore();

  async addEvent(data, calendarId, token) {
    // data = JSON.parse(data);
    // console.log(data)
    let location = data.location || null;
    let summary = data.summary || null;
    let colorId = data.colorId || null;
    let recurrence = data.recurrence || null;
    let id = data.id || null;
    // let attachments = data?.attachments?.[0]?.fileUrl || null;
    if (data.attachments !== null) {
      attachments = 
        [{
          fileUrl: data.attachments[0].fileUrl
        }
        ]
      }
    // console.log(data.attachments[0].fileUrl);
    // let ids = await uuid.v1();
    // let id =  Buffer(ids).toString('base64');
    // console.log(id)

    var options = {
      method: 'post',
      url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?supportsAttachments=true`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        start: {
          dateTime: data.starttime,
          timeZone: 'Asia/Jerusalem',
        },
        end: {
          dateTime: data.endtime,
          timeZone: 'Asia/Jerusalem',
        },
        location: location,
        summary: summary,
        colorId: colorId,
        recurrence:recurrence,
        id:id,
        attachments:attachments

      }),
    };
    return new Promise( (res) => {
      request(options, function (error, response) {
        res(response);
        if (error) throw new Error(error);
      });
    }).then((response) => {
      if (response.statusCode !== 200) {
        console.log('error', response.body);
        return 400;
      } else {
        console.log('seccess1' + response.body);
        return response.body;
      }
    });
  },

  async getEvents(calendarId, token,timeMin,timeMax) {
    // console.log(data)
    if (timeMin !== undefined || timeMax !== undefined) {
    var options = {
      method: 'get',
      url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${timeMin}&timeMax=${timeMax}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
    else{
      var options = {
        method: 'get',
        url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return new Promise((res) => {
      request(options, function (error, response) {
        res(response);
        if (error) throw new Error(error);
      });
    }).then((response) => {
      let res = JSON.parse(response.body)
     console.log(res.length)
      if (response.statusCode !== 200) {
        console.log('error', response);
        return 400;
      } else {
        // console.log(res.items)
        return res.items;
      }
    });
  },

  async updateEvent(data, calendarId, token) {
    let location = data.body.location || null;
    let summary = data.body.summary || null;
    let colorId = data.body.colorId || null;
    let recurrence = data.body.recurrence || null;

    console.log(data.body.calendarId, data.body.id, data.body.token)
    var options = {
      method: 'put',
      url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${data.body.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        // ya29.a0AVvZVso81Yl06-Uj60GWDgcDb_3U8kqEbiarAkz3uAUFZL7LEpVb5K0xa19X3VuzyuT2gvV3ONYG9Fg3uSy30sdXkP8bhckuefHJMhQM_BI4f3nvbFNlgO4UrRE82V48xnCRg_7Se4xsN2pCDqVuHi0pJnNCRwaCgYKAZYSARESFQGbdwaIHUMYDx70xqovRqYdUQWZ7Q0165'
      },
      body: JSON.stringify({
        start: {
          dateTime: data.body.startTime,
          timeZone: 'Asia/Jerusalem',
        },
        end: {
          dateTime: data.body.endTime,
          timeZone: 'Asia/Jerusalem',
        },
        location: location,
        summary: summary,
        colorId: colorId,
        recurrence:recurrence,
    
      }),
    };
    return new Promise((res) => {
      request(options, function (error, response) {
        if (error) throw new Error(error);
        res(response);
      });
    }).then((response) => {
      if (response.statusCode !== 200) {
        // console.log('error', response.statusCode);
        return 400;
      } else {
        // console.log('seccess' + response.body)
        return response.body;
      }
    });
  },

  async deleteEvent(id, calendarId, token) {
    var options = {
      method: 'DELETE',
      url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    };

    return new Promise((res) => {
      request(options, function (error, response) {
        res(response);
        if (error) throw new Error(error);
      });
    }).then((response) => {
      if (response.statusCode !== 204) {
        console.log('error' + JSON.stringify(response));
        return 400;
      } else {
        // console.log('seccess' + response.body);
        return response.body;
      }
    });

  
  },





  ///-----------------------

// async addEvent(data, calendarId, token) {
//   const location = data.location || null;
//   const summary = data.summary || null;
//   const colorId = data.colorId || null;
//   const recurrence = data.recurrence || null;
//   const id = data.id || null;
//   console.log(data.startTime, data.endTime);

//   // Prepare file data (if available)
//   let fileData = null;
//   if (data.body.fileUrl) {
//     fileData = fs.readFileSync(data.body.fileUrl);
//   }

//   // Set up the Google Calendar API
//   const auth = new google.auth.OAuth2();
//   auth.setCredentials({ access_token: token });
//   const calendar = google.calendar({ version: 'v3', auth });

//   const event = {
//     start: {
//       dateTime: data.body.startTime,
//       timeZone: 'Asia/Jerusalem',
//     },
//     end: {
//       dateTime: data.body.endTime,
//       timeZone: 'Asia/Jerusalem',
//     },
//     location: location,
//     summary: summary,
//     colorId: colorId,
//     recurrence: recurrence,
//     id: id,
//   };

//   // If file data exists, add it as an attachment to the event
//   if (fileData) {
//     const media = {
//       mimeType: 'application/octet-stream',
//       body: fileData,
//     };
//     const res = await calendar.events.insert({
//       calendarId: calendarId,
//       resource: event,
//       media: media,
//     });
//     console.log('Event created: ', res.data);
//     return res.data;
//   } else {
//     const res = await calendar.events.insert({
//       calendarId: calendarId,
//       resource: event,
//     });
//     console.log('Event created: ', res.data);
//     return res.data;
//   }
// }



};
