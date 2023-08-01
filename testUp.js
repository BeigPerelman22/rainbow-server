// const request = require('request');
// var fs = require('fs');

// // let file = fs.createReadStream('./test.pdf')
// // // Create a request object
// // const options = {
// //   url: 'http://localhost:8080/calendar/newevent',
// //   method: 'POST',
// // //   body: fs.createReadStream('test.pdf'),

// //   headers: {
// //     'calendarId': 'levi7701414@gmail.com',
// //         'startTime': '2023-05-28T09:00:00-07:00',
// //         'endTime': '2023-05-29T09:00:00-07:00',
// //         'summary': '"sslas"',
// //         'colorId': '11',
// //         'token': "ya29.a0AbVbY6Ogs0Tt-Gdj8naM8YVM8TwfdFyxMbbs5MkwvAPnW6LK7c7R4H_KqEqf9ShmvbTCW0WgslJ2xZJenRuLg9nqDJ_Kkc3zg_tciqtWWrE0682kcgQQTmote8Bz7VNjfeI_Gf6LMBQHcYxEXVyS9uHZ5Y28aCgYKAToSARESFQFWKvPlzQMbwBcOgab4Q67PP4NEEw0163",
// //   }  ,
// //   formData: [
// //     {
// //       "name": 'pdf',
// //       "value": file,
// //     }]
// // //     {
// // //       "name": 'name',
// // //       "value": fs.createReadStream('test.json'),
// // //     },
// // //   ],
// // };

// // // Send the request
// // request(options, (error, response, body) => {
// //   if (error) {
// //     console.log(error);
// //   } else {
// //     console.log(response.statusCode);
// //     console.log(body);
// //   }
// // });




// // // var request = require('request');
// // var fs = require('fs');
// // var options = {
// //   'method': 'POST',
// //   'url': 'https://us-central1-rainbow-server-6a19e.cloudfunctions.net/app/calendar/newevent',
// //   'headers': {
// //     'calendarId': 'levi7701414@gmail.com',
// //     'startTime': '2023-05-28T09:00:00-07:00',
// //     'endTime': '2023-05-29T09:00:00-07:00',
// //     'summary': '"sslas"',
// //     'colorId': '11',
// //     'token': '"ya29.a0AbVbY6Ogs0Tt-Gdj8naM8YVM8TwfdFyxMbbs5MkwvAPnW6LK7c7R4H_KqEqf9ShmvbTCW0WgslJ2xZJenRuLg9nqDJ_Kkc3zg_tciqtWWrE0682kcgQQTmote8Bz7VNjfeI_Gf6LMBQHcYxEXVyS9uHZ5Y28aCgYKAToSARESFQFWKvPlzQMbwBcOgab4Q67PP4NEEw0163"',
// //     'Authorization': 'Bearer "ya29.a0AbVbY6Ogs0Tt-Gdj8naM8YVM8TwfdFyxMbbs5MkwvAPnW6LK7c7R4H_KqEqf9ShmvbTCW0WgslJ2xZJenRuLg9nqDJ_Kkc3zg_tciqtWWrE0682kcgQQTmote8Bz7VNjfeI_Gf6LMBQHcYxEXVyS9uHZ5Y28aCgYKAToSARESFQFWKvPlzQMbwBcOgab4Q67PP4NEEw0163"'
// //   },
// //   formData: {
// //     'pdf': {
// //       'value': fs.createReadStream("C:/Users/leviv/Downloads/מבחנים/פתרון בחינת מועד א - התשובה הראשונה היא הנכונה בכל שאלה (2).pdf"),
// //       'options': {
// //         'filename': "C:/Users/leviv/Downloads/מבחנים/test.json",
// //         'contentType': null
// //       }
// //     },
// //     'name': {
// //       'value': fs.createReadStream('C:/Users/leviv/Downloads/מבחנים/test.json'),
// //       'options': {
// //         'filename': 'Users/leviv/Downloads/מבחנים/test.json',
// //         'contentType': null
// //       }
// //     }
// //   }
// // };
// // request(options, (error, response, body) => {
// //     if (error) {
// //       console.log(error);
// //     } else {
// //       console.log(response.statusCode);
// //       console.log(body);
// //     }
// // });
// // var request = require('request');
// // var fs = require('fs');

// let file = fs.createReadStream('C:/Users/leviv/Downloads/מסמך לצפיה.pdf')
// pdfFile = fs.createReadStream('test.pdf')
// nameFile = fs.createReadStream('test.json')
// const formData = new FormData();
// formData.append('pdf',pdfFile ,'test.pdf'); // המחרוזת השנייה מייצגת את שם הקובץ בצורה סטטית
// formData.append('name', nameFile,'test.json');
// // formData.append('pdf', pdfFile, 'pdf-file.pdf'); // המחרוזת השנייה מייצגת את שם הקובץ בצורה סטטית
// // formData.append('name', nameFile, 'name-file.txt'); // המחרוזת השנייה מייצגת את שם הקובץ בצורה סטטי
// // formData.append;
// var options = {
//   'method': 'POST',
//   'url': 'http://localhost:8080/calendar/newevent',
//   'headers': {
//     'calendarId': 'levi7701414@gmail.com',
//     'startTime': '2023-05-28T09:00:00-07:00',
//     'endTime': '2023-05-29T09:00:00-07:00',
//     'summary': '"sslas"',
//     'location': '"tel aviv"',
//     'colorId': '11',
//     'token': 'ya29.a0AbVbY6Pl4tyCmkaFPD8CPAJul9wq23P37uviO_Rw05BccIJ5rEhaB2_xOHPlH_1OYWrux_xlNQJ5n9YUc-znWp0nlpOvZFJz5s5HdYMwa97kOf8vGgLm9LJHW45PDu8PIa_u-WsvXA0rfLHKk1975z1XI0mOaCgYKAVYSARESFQFWKvPlDWzpHUZkzxQUwlxlVbO-xg0163',
//     'Authorization': 'Bearer ya29.a0AbVbY6OSeY_hjeX00Tbl8ePZMgPTL3iYjTh4lGgijMIagIvWUZ_fBMPkNaPG7W_weyIcOTFYKEgYPUOVKc1kKVLwDnLfujfHA_T0ZLJE9yskj0dUZtEPS0vJjHdoDOq4I02h027xAlds-mJP7pRzGeD2adrRaCgYKAckSARESFQFWKvPl8GRC0QK_IY896ybnWfPJWA0163'
//   },
//   body:formData
// //   formData: {
// //     'pdf': {
// //       'value': file,
// //       'options': {
// //         'filename': 'Users/leviv/Downloads/מסמך לצפיה.pdf',
// //         'contentType': null
// //       }
// //     }
// //   }

// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });


const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

const apiUrl = 'http://localhost:8080/upload';
// const token = 'YOUR_API_TOKEN';

const pdfFilePath = './test.pdf';
const nameFilePath = './test.json';

const formData = new FormData();
formData.append('pdf', fs.createReadStream(pdfFilePath), {
  filename: 'מסמך לצפיה.pdf',
});
formData.append('name', fs.createReadStream(nameFilePath), {
  filename: 'test.json',
});

// דפדפן יתייחס לשימוש ב-localhost כאתר בפרוטוקול HTTP,
// על ידי הוספת http:// לכתובת האתר:
// const apiUrl = 'http://localhost:8080/calendar/newevent';

const token = 'ya29.a0AbVbY6Nadb6MsQiD6Aq5ty5w-lMJBgal_OA9-FUlgUeat9deOq1YTyvt3PbVCgXOktvgzllacfn_bitBNV3CSSUNax1xoE_g0By07veXv8iV_x-pr8boyOEfNhykzsV3Epc9fvF5YnJ0S75h6658AfahCYNeaCgYKAVYSARESFQFWKvPlRN9XOQLjvDLNAnvswkzthg0163'; // אתה צריך לקבוע את ערך האטריביוט token לפי דרישות האימות של ה-API שלך

// const pdfFilePath = 'test.pdf';
// const nameFilePath = 'test.json';

// const formData = new FormData();
// formData.append('pdf', fs.createReadStream(pdfFilePath), 'מסמך לצפיה.pdf');
// formData.append('name', fs.createReadStream(nameFilePath), 'test.json');

const requestOptions = {
  method: 'POST',
  headers: {
    "token": token, // או "Authorization": `Bearer ${token}` כפי שמופיע בדוגמא למטה
    Authorization: `Bearer ${token}`,
  },
  body: formData,
};

async function uploadFiles() {
  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// דוגמה לשימוש בפונקציה:

async function main() {
const response = await uploadFiles();
console.log('API response:', response);

}

main();
