let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventTimeInput  = document.getElementById('eventTimeInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date)
 {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay)
  {
    //  document.getElementById('eventText').innerText = eventForDay.title;
    // document.getElementById('eventTime').innerText = eventForDay.time;
    //document.getElementById("eventTitleInput").value = "date";
    var inputTitle = document.getElementById("eventTitleInput1");
    var inputTime = document.getElementById("eventTimeInput1");
    inputTitle.value = eventForDay.title; //"New Value";
    inputTime.value = eventForDay.time;
    
    deleteEventModal.style.display = 'block';
  }
  else
  {
       newEventModal.style.display = 'block';
  }

 backDrop.style.display = 'block';
}

function load() 
{
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us',
   {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else
     {
         daySquare.classList.add('padding');
     }

    calendar.appendChild(daySquare);    
  }
}

function closeModal()
 {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  eventTimeInput.value='';
  clicked = null;
  load();
}

function saveEvent()
 {

  // var now_utc = (new Date(clicked , eventTitleInput.value).toISOString())
  // console.log(now_utc)

  saveINGoogle("2023-03-26T09:00:00-07:00","2023-03-26T10:00:00-07:00");
  if (eventTitleInput.value) 
  {
    eventTitleInput.classList.remove('error');

   

    events.push
    ({
      date: clicked,
      title: eventTitleInput.value,
      time: eventTimeInput.value,
    });
    console.log(eventTimeInput.value + clicked);
    localStorage.setItem('events', JSON.stringify(events));
    

    closeModal();
  }
   else 
  {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() 
{
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));

  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}



function saveINGoogle (startTime,entTime){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "calenderID": "levi7701414@gmail.com",
  "token":"ya29.a0AVvZVso6CaB9IXIzWN-Bukme6Y-M09COQuj8UQrkCmAnpJe2-I8InBbIHva2a8qINCPc_llxdw1kHQlgVFS0VtRBRqolVOjTNS_Op7lSJn97AbYk9BwNDFm3aZ9ZP-FzRWBKI6D07VNbbd1iM5_WbBrEXNgOVAaCgYKAecSARESFQGbdwaIglj9R2fqUkFTho0DZL7UsA0165",
  "startTime": startTime,
  "entTime": entTime
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:773/calendar/newevent", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

initButtons();
load();