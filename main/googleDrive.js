
const express = require('express');
const fileUpload = require('express-fileupload');
const { google } = require('googleapis');
const fs = require('fs');
var request = require('request');
// var fs = require('fs');.
// const fs = require('fs');
const axios = require('axios');
const app = express();

const mime = require('mime-types');
app.use(fileUpload({
    useTempFiles : true,
}));


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
  'url': 'https://www.googleapis.com/upload/drive/v3/files',
  'headers': {
    'Authorization': accessToken,
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

return new Promise( (res) => {
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
}).then((response) => {
  if (response.statusCode !== 204) {
    console.log('error' + JSON.stringify(response));
    return 400;
  } else {
    console.log('seccess' + response.body);
    return response.body;
  }
});


}
}

function createFolderInGoogleDrive(accessToken, folderName) {
  const url = 'https://www.googleapis.com/upload/drive/v3/files';
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  const data = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  return new Promise((resolve, reject) => {
    request.post(
      {
        url,
        headers,
        json: true,
        body: data,
      },
      (error, response, body) => {
        if (error) {
          console.error('אירעה שגיאה ביצירת התיקיה:', error.message);
          return reject(error);
        }

        if (response.statusCode !== 200) {
          console.error(
            'אירעה שגיאה ביצירת התיקיה. קוד תגובה:',
            response.statusCode
          );
          return reject(new Error('שגיאה ביצירת התיקיה.'));
        }

        console.log('נוצרה תיקיה חדשה ב-Google Drive.');
        console.log('ה-ID של התיקיה הוא:', body.id);
        resolve(body.id);
      }
    );
  });
}

  async function up(fileContent, accessToken,name) {
    const mimeType = mime.lookup(fileContent) || 'application/octet-stream';

  

  var options = {
    'method': 'POST',
    'url': 'https://www.googleapis.com/upload/drive/v3/files',
    'headers': {
      'Authorization': accessToken,
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

  
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
  
  
  }


// app.post('/upload', async (req, res) => {

//   // createFolderInGoogleDrive(req.headers.authorization, 'test')
//   if ( !req.files.pdf) {
//     return res.status(400).send('לא נמצא קובץ להעלאה.');
//   }
//   let data = {
//     name: JSON.stringify(req.headers.summary),
//   }
// // writeJsonFile( JSON.stringify(data))
//   // console.log("fdfdsf" + fs.createReadStream(req.files.name.tempFilePath))

//   const pdf =await req.files.pdf;
//   const name =await req.files.name;
// //  await  console.log("sdsd" + req.files.pdf.tempFilePath);
//   const fileContent =await fs.createReadStream(pdf.tempFilePath);
// const nameFile =await fs.createReadStream(name.tempFilePath);
//   const accessToken = req.headers.authorization; // קבלת הטוקן מכותרת ה-authorization של הבקשה
// console.log(accessToken)
//   if (!accessToken) {
//     return res.status(400).send('יש לספק טוקן הרשאות לדרייב שלך.');
//   }
// // let 
//   // העלאת הקובץ לדרייב
//   console.log(name)
//   await up(fileContent, accessToken,nameFile)

//   res.send('הקובץ הועלה בהצלחה!');
// });

// app.listen(3000, () => {
//   console.log('ה-API ממתין לבקשות בפורט 3000');
// });



const data = {
  name: 'John Doe',
  age: 30,
  email: 'johndoe@example.com'
};

// המרה של האובייקט למחרוזת JSON
const jsonData = JSON.stringify(data, null, 2); // הארגומנטים null ו-2 מביעים שהמרווח בין שדות ה-JSON יהיה 2 תווים

// כתיבת המחרוזת לקובץ באמצעות פונקצית writeFile
async function writeJsonFile(jsonData) {
fs.writeFile(`test.json`, jsonData, 'utf8', (err) => {
  if (err) {
    console.error('אירעה שגיאה בכתיבת הקובץ:', err);
  } else {
    console.log('הקובץ נוצר בהצלחה!');
  }
});
}