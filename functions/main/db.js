const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports.db= {
// Initialize Cloud Firestore and get a reference to the service
// const db = firebase.firestore();

async  addEvent(collection,data){
  // data = JSON.stringify(data);
await delete data.token
console.log("asdasd" + data.id);
 let doc = await db.collection(collection).doc(data.id).set(data);
//  const cityRef = await db.collection(collection).doc(data.id);
//  const city = await cityRef.get();
// await console.log(doc)
return data ;
},


async  getEvents (collection,calenderId){
  // console.log(data.calenderId)
  const events = [];
  const citiesRef =await db.collection(collection)
  //.where('calenderId','==',data.calendarId);
 let snapshot = await citiesRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      events.push(doc.data());
    });
  })
   if (events === 0) {
    console.log('No such document!',snapshot.empty);
    return 400;
  } else {
    return events;
  }
} ,


async  updateEvent (collection,doc,data){
  await delete data.token
  const cityRef = await db.collection(collection).doc(doc);

// Set the 'capital' field of the city
  const res = await cityRef.update(data);
  const city = await cityRef.get();
  // await console.log(JSON.stringify(city.data()))
  return JSON.stringify(city.data());
},

async  deleteEvent (collection,id){
  // await delete data.token
  const cityRef = await db.collection(collection).doc(id).delete();


  return cityRef;
}



}





