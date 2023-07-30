var request = require('request');
var bodyParser = require('body-parser');
const path = require('path');
var jsonParser = bodyParser.json();
const uuid = require('uuid');
// let id =  Buffer.(uuid).toString('base64');
const { google } = require('googleapis');
const { file } = require('googleapis/build/src/apis/file');
const { title } = require('process');

module.exports.google = {
  // Initialize Cloud Firestore and get a reference to the service
  // const db = firebase.firestore();

  async addEvent(data, calendarId, token) {
    // data = JSON.parse(data);
    console.log("this is the data " +calendarId)
    let location = data.location || null;
    let summary = data.summary || null;
    let colorId = data.colorId || null;
    let recurrence = data.recurrence || null;
    let id = data.id || null;
    const attachmentslink = [
      {file : data?.attachments?.receiptFile,name:"receiptFile"},
      {file: data?.attachments?.submittedFile,name:"submittedFile"},
      {file : data?.attachments?.moneyRefundFile,name:"moneyRefundFile"}
    ]
   
    // if(attachmentslink){
      attachments = []
      for(let i=0;i<attachmentslink.length;i++){
        if(attachmentslink[i].file!==undefined){
          attachments.push({
        fileUrl: attachmentslink[i].file,
        title:attachmentslink[i].name
        
      })
    }
    // }
  }
    // let attachments = data?.attachments?.[0]?.fileUrl || null;
    // if (data.attachments !== null && data.attachments[0] !== undefined) {
    //   attachments = 
    //     [{
    //       fileUrl: data.attachments[0].fileUrl
    //     }
    //     ]
    //   }
    //   else{
    //     attachments=[]
    //   }
    // let ids = await uuid.v1();
    // let id =  Buffer(ids).toString('base64');
  await  console.log("fdsfds" + JSON.stringify(attachments))

    var options = {
      method: 'post',
      url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?supportsAttachments=true`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        start: {
          dateTime: data.startTime,
          timeZone: 'Asia/Jerusalem',
        },
        end: {
          dateTime: data.endTime,
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
    const attachmentslink = [
      {file : data?.attachments?.receiptFile,name:"receiptFile"},
      {file: data?.attachments?.submittedFile,name:"submittedFile"},
      {file : data?.attachments?.moneyRefundFile,name:"moneyRefundFile"}
    ]
   
    // if(attachmentslink){
      attachments = []
      for(let i=0;i<attachmentslink.length;i++){
        if(attachmentslink[i].file!==undefined){
          attachments.push({
        fileUrl: attachmentslink[i].file,
        title:attachmentslink[i].name
        
      })
    }
    // }
  }
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
        attachments:attachments
    
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


};
