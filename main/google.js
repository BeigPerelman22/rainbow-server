var request = require('request');
var bodyParser = require('body-parser');
const path = require('path');
var jsonParser = bodyParser.json();
const uuid = require('uuid');
// let id =  Buffer.(uuid).toString('base64');

module.exports.google = {
  // Initialize Cloud Firestore and get a reference to the service
  // const db = firebase.firestore();

  async addEvent(data) {
    let location = data.body.location || null;
    let summary = data.body.summary || null;
    let colorId = data.body.colorId || null;
    let recurrence = data.body.recurrence || null;
    let id = data.body.id || null;
    console.log(data.body.startTime, data.body.endTime);
    // let ids = await uuid.v1();
    // let id =  Buffer(ids).toString('base64');
    // console.log(id)

    var options = {
      method: 'post',
      url: `https://www.googleapis.com/calendar/v3/calendars/${data.body.calendarId}/events`,
      headers: {
        Authorization: `Bearer ${data.body.token}`,
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
        id:id
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
        console.log('seccess' + response.body);
        return response.body;
      }
    });
  },

  async getEvents(data) {
    // console.log(data)
    var options = {
      method: 'get',
      url: `https://www.googleapis.com/calendar/v3/calendars/${data.calendarId}/events?timeMin=${data.timeMin}&timeMax=${data.timeMax}`,
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    };
    return new Promise((res) => {
      request(options, function (error, response) {
        res(response);
        if (error) throw new Error(error);
      });
    }).then((response) => {
      let res = JSON.parse(response.body)
     console.log(res.length)
      if (response.statusCode !== 200) {
        return 400;
      } else {
        // console.log(res.items)
        return res.items;
      }
    });
  },

  async updateEvent(data) {
    let location = data.body.location || null;
    let summary = data.body.summary || null;
    let colorId = data.body.colorId || null;
    let recurrence = data.body.recurrence || null;

    console.log(data.body.calendarId, data.body.id, data.body.token)
    var options = {
      method: 'put',
      url: `https://www.googleapis.com/calendar/v3/calendars/${data.body.calendarId}/events/${data.body.id}`,
      headers: {
        Authorization: `Bearer ${data.body.token}`,
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

  async deleteEvent(data) {
    var options = {
      method: 'DELETE',
      url: `https://www.googleapis.com/calendar/v3/calendars/${data.calendarId}/events?timeMin=2023-07-01T00:00:00Z&timeMax=2023-07-31T23:59:59Z`,
      headers: {
        Authorization: `Bearer ${data.token}`,
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
};
