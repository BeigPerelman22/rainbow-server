let nav = 0;
let clicked = null;
let currentEvent = null;
let events;

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventTimeInput  = document.getElementById('eventTimeInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;
  currentEvent = events.find(e => dateToString(e.start.dateTime) === date);

  if (currentEvent) {
    let inputTitle = document.getElementById("eventTitleInput1");
    let inputTime = document.getElementById("eventTimeInput1");
    inputTitle.value = currentEvent.summary; //"New Value";
    inputTime.value = currentEvent.start.dateTime.slice(0,16);
    
    deleteEventModal.style.display = 'block';
  } else {
       newEventModal.style.display = 'block';
  }

 backDrop.style.display = 'block';
}

function initCalender() {
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

    const eventForDay = events?.find(e => {
      const dateString = e.start.dateTime;
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      return formattedDate === dayString;
    });

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.summary || "ללא תיאור";
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

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  eventTimeInput.value='';
  clicked = null;
}

function saveEvent() {
  if (eventTitleInput.value)  {
    let startDate = new Date(eventTimeInput.value);
    let endDate = startDate.getTime() + 30 * 60 * 1000
    endDate = new Date(endDate);
    saveINGoogle(startDate.toISOString().slice(0, 24),endDate.toISOString().slice(0, 24), eventTitleInput.value);
    eventTitleInput.classList.remove('error');
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
    const eventToDelete = events.find(e => dateToString(e.start.dateTime) === clicked);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let body = JSON.stringify({
      "calenderId": JSON.parse(localStorage.getItem('calendar_id')),
      "token": JSON.parse(localStorage.getItem('token')),
      "eventId": eventToDelete.id
    });

    let requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: body,
      redirect: 'follow'
    };

    fetch("https://rainbow-server-6a19e.web.app/calendar/deleteevent", requestOptions)
      .then(result => {
           events = events.filter(event => event.id !== eventToDelete.id);
           initCalender();
      })
      .catch(error => console.log('error', error));

  closeModal();
}

function onUpdateEventClicked() {
    let inputTitle = document.getElementById("eventTitleInput1");
    let inputTime = document.getElementById("eventTimeInput1");

  if (inputTitle.value)  {
    let startDate = new Date(inputTime.value);
    let endDate = startDate.getTime() + 30 * 60 * 1000
    endDate = new Date(endDate);
    updateEvent(startDate.toISOString().slice(0, 24),endDate.toISOString().slice(0, 24), inputTitle.value);
    inputTitle.classList.remove('error');
    closeModal();
  } else {
    inputTime.classList.add('error');
  }
}

function onMonthChanged(indexDiff) {
    nav = nav + indexDiff;
    initCalender();
}

function saveINGoogle(startTime, entTime, summary){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let body = JSON.stringify({
      "calenderId": JSON.parse(localStorage.getItem('calendar_id')),
      "token": JSON.parse(localStorage.getItem('token')),
      "startTime": startTime,
      "endTime": entTime,
      "summary": summary,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: body,
      redirect: 'follow'
    };

    fetch("https://rainbow-server-6a19e.web.app/calendar/newevent", requestOptions)
      .then(response => response.text())
      .then(result => {
       let newEvent =  JSON.parse(result);
       events = [...events, newEvent];
       initCalender();
      })
      .catch(error => console.log('error', error));
}

function updateEvent(startTime, endTime, summary) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let body = JSON.stringify({
      "calenderId": JSON.parse(localStorage.getItem('calendar_id')),
      "token": JSON.parse(localStorage.getItem('token')),
      "startTime": startTime,
      "endTime": endTime,
      "summary": summary,
      "eventId": currentEvent.id
    });

    let requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: body,
      redirect: 'follow'
    };

    fetch("https://rainbow-server-6a19e.web.app/calendar/updateevent", requestOptions)
      .then(response => response.text())
      .then(result => {
        const updatedEvent = JSON.parse(result);
        const index = events.findIndex(event => event.id === currentEvent.id);
        events[index] = updatedEvent;
        initCalender();
      })
      .catch(error => console.log('error', error));
}

function loadEvents() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let body = JSON.stringify({
      "calenderId": JSON.parse(localStorage.getItem('calendar_id')),
      "token": JSON.parse(localStorage.getItem('token'))
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body
    }

    fetch("https://rainbow-server-6a19e.web.app/calendar/events", requestOptions)
        .then(response => response.text())
        .then(result => {
            let eventsResult = JSON.parse(result).items;
            events = eventsResult;
            initCalender()
        })
        .catch(error => console.log('error', error));
}

function dateToString(dateToFormat) {
  const date = new Date(dateToFormat);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}/${day}/${year}`;
}

if (!localStorage.getItem('token')) {
    window.location.href = '/'
}

loadEvents();