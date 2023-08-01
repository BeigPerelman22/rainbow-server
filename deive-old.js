
// פונקציה להעלאת הקובץ לדרייב
// async function uploadFileToDrive(fileContent, accessToken) {
//   const oauth2Client = new google.auth.OAuth2();
//   oauth2Client.setCredentials({ access_token: accessToken });
//   console.log(accessToken)
//   const drive = google.drive({
//     version: 'v3',
//     auth: oauth2Client,
//   });

//   const fileMetadata = {
//     name: 'my-rain.pdf', // שם הקובץ ב-Google Drive
//     parents: ['rainbow'], // תיקיית היעד ב-Google Drive
//   };

  // const response = await drive.files.create({
  //   requestBody: fileMetadata,
  //   media: {
  //     mimeType: 'multipart/form-data',
  //     body: fileContent,
  //   },
  // });

//   console.log('הקובץ הועלה בהצלחה!');
//   console.log('ID של הקובץ ב-Google Drive:');
// }

//פןקנציה נוספת

// async function uploadToGoogleDriveNEw(token, fileContent) {
//   const uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media';
//   const headers = {
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/octet-stream',
//   };

//   try {
//     const response = await axios.post(uploadUrl, fileContent, {
//       headers: headers,
//     });

//     if (response.status === 200) {
//       console.log('הקובץ הועלה בהצלחה ל-Google Drive!');
//     } else {
//       console.log('שגיאה בהעלאת הקובץ. קוד שגיאה:', response.status);
//     }
//   } catch (error) {
//     console.error('שגיאה בזמן העלאת הקובץ:', error.message);
//   }
// }


async function uploadFileToDrive(token, file, fileName) {
    // Create a new Google Drive API client.
    const drive = new google.drive({
      version: 'v3',
      auth: {
        accessToken: token,
      },
    });
  
    // Create a new file object.
    const fileMetadata = {
      name: fileName,
    };
  
    // Upload the file to Drive.
    // drive.files.create(fileetadata, {
    //   media: file,
    // }, (err, file) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
  
    //   console.log('File uploaded successfully!');
    // });
  
    await drive.files.create({
          requestBody: fileMetadata,
          media: {
            mimeType: 'multipart/form-data',
            body: file,
          },
        });
  }
  
  
  // app.post('/up',async(req,res)=>{

  // })


// function uploadFileToGoogleDrive(file, accessToken) {
//   // Create a new FormData object.
//   const formData = new FormData();

//   // Add the file to the FormData object.
//   formData.append('file', file);

//   // Set the Content-Type header.
//   const contentType = file.type || 'application/octet-stream';
//   const headers = {
//     'Authorization': accessToken,
//     'Content-Type': contentType,
//   };

//   // Make a POST request to the Google Drive API.
//   fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=media`, {
//     method: 'POST',
//     body: formData,
//     headers: headers,
//   });
// }