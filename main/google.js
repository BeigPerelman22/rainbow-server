


var request = require('request');
var bodyParser = require('body-parser')
const path = require('path');
var jsonParser = bodyParser.json()



module.exports.google= {
// Initialize Cloud Firestore and get a reference to the service
// const db = firebase.firestore();

async  addEvent(data){
  let location = data.body.location || null;
  let summary = data.body.summary || null;
  let colorId = data.body.colorId ||null
  console.log(data.body.startTime, data.body.endTime)

  var options = {
    method: 'post',
    url: `https://www.googleapis.com/calendar/v3/calendars/${data.body.calenderId}/events`,
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
        colorId :colorId
    }),
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    return response.body;

   
  });



  

},


async  getEvents (data){
  var options = {
    method: 'GET',
    url: `https://www.googleapis.com/calendar/v3/calendars/${data.body.calenderId}/events`,
    headers: {
      Authorization: `Bearer ${data.body.token}`
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    return response.body;
  });
} ,


async  updateEvents (collection,doc,data){
  const cityRef = db.collection(collection).doc(doc);

// Set the 'capital' field of the city
  const res = await cityRef.update(data);
  return snapshot;
}

}





