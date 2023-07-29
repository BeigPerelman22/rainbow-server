
const express = require('express');
const fileUpload = require('express-fileupload');
const { google } = require('googleapis');
const fs = require('fs');
var request = require('request');
const axios = require('axios');
// const app = express();

const mime = require('mime-types');
// app.use(fileUpload({
//     useTempFiles : true,
// }));


module.exports.drive = {
async getlinkFile(accessToken, fileId) {
  var request = require('request');
var options = {
  'method': 'GET',
  'url': `https://www.googleapis.com/drive/v3/files/${fileId}?fields=webViewLink,mimeType,name`,
  'headers': {
    'Authorization': `Bearer ${accessToken}`} 
  }

request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
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

async  upFile(fileContent, accessToken,name) {
  const mimeType = mime.lookup(fileContent) || 'application/octet-stream';



var options = {
  'method': 'POST',
  'url': 'https://www.googleapis.com/upload/drive/v3/files?fields=webViewLink,mimeType,name,id',
  'headers': {
    'Authorization': `Bearer ${accessToken}`,
    'mimeType': mimeType,
    "Content-Type": "application/json",
  },
  // "formData": formData
  formData: {
    'pdf': {
      'value': fileContent,
      'options': {
        'filename': 'Users/leviv/OneDrive/מסמכים/Levi Vorst - CV.pdf',
        'contentType': null
      }
    },
    'name': {
      'value': name,
      'options': {
        'filename': 'Users/leviv/Downloads/מבחנים/test.json',
        'contentType': null
      }
    }
  }
};

// return new Promise( (res) => {
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.statusCode);
// });
// }).then((response) => {
//   if (response.statusCode !== 200) {
//     console.log('error' + JSON.stringify(response));
//     return 400;
//   } else {
//     console.log('seccess' + response.body);
//     return response.body;
//   }
// });

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
    //   console.log('seccess' + response.body);
      return response.body;
    }
  });


}
}


 