
const express = require('express');
const fileUpload = require('express-fileupload');
const { google } = require('googleapis');
const fs = require('fs');

const app = express();
app.use(fileUpload({
    useTempFiles : true,
}));

// פונקציה להעלאת הקובץ לדרייב
async function uploadFileToDrive(fileContent, accessToken) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });

  const fileMetadata = {
    name: 'my-rain.pdf', // שם הקובץ ב-Google Drive
    parents: ['rainbow'], // תיקיית היעד ב-Google Drive
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media: {
      mimeType: 'application/pdf',
      body: fileContent,
    },
  });

  console.log('הקובץ הועלה בהצלחה!');
  console.log('ID של הקובץ ב-Google Drive:');
}

app.post('/upload', async (req, res) => {
  if ( !req.files.pdf) {
    return res.status(400).send('לא נמצא קובץ להעלאה.');
  }

  const pdf =await req.files.pdf;
//  await  console.log("sdsd" + req.files.pdf.tempFilePath);
//   const fileContent =await fs.createReadStream(pdf.tempFilePath);

  const accessToken = req.headers.authorization; // קבלת הטוקן מכותרת ה-authorization של הבקשה

  if (!accessToken) {
    return res.status(400).send('יש לספק טוקן הרשאות לדרייב שלך.');
  }

  // העלאת הקובץ לדרייב
  await uploadFileToDrive(fileContent, accessToken);

  res.send('הקובץ הועלה בהצלחה!');
});

app.listen(3000, () => {
  console.log('ה-API ממתין לבקשות בפורט 3000');
});
