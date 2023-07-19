let tokenClient;

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const CLIENT_ID = '85903642158-afk6nadtdach9qstunu10ktnjo5h4oim.apps.googleusercontent.com';
const API_KEY = 'AIzaSyA_VyASXClKV8XWdG0chE1puMpcVHTfmds';
const SCOPES = ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/drive.file'];

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES.join(' '),
      callback: '', // defined later
    });
}

function login() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      await saveUserCredentials();
    };

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({prompt: 'consent'});
      console.log(tokenClient);
    } else {
      tokenClient.requestAccessToken({prompt: ''});
    }
}

async function saveUserCredentials() {
  try {
    let calendarList = gapi.client.calendar.calendarList.list();
    calendarList.execute((response) => {
        if (response && response.items && response.items.length > 0) {
          var calendarId = response.items[0].id;
          localStorage.setItem('calendar_id', JSON.stringify(calendarId));
          localStorage.setItem('token', JSON.stringify(gapi.client.getToken().access_token));
          window.location.href = '/home'
        } else {
          console.log('No calendars found for this user.');
        }
    })
  } catch (err) {
    return;
  }
}

//if (localStorage.getItem('token')) {
//    window.location.href = '/home'
//}