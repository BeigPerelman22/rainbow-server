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
await delete data.token
 let doc = await db.collection(collection).add(data)
 console.log(doc)

},


async  getEvents (collection,data){
  const events = [];
  const citiesRef =await db.collection(collection).where('calenderId','==',data.calenderID);
 let snapshot = await citiesRef.get().then((querySnapshot) => {
    
    querySnapshot.forEach((doc) => {
      events.push(doc.data());
    });
  })
   if (events === 0) {
    console.log('No such document!',snapshot.empty);
    return 400;
    // return 400
  } else {
    // console.log('Document data:', events);
    return events;
  }
  
 
} ,


async  updateEvents (collection,doc,data){
  await delete data.token
  const cityRef =await db.collection(collection).doc(doc);

// Set the 'capital' field of the city
  const res = await cityRef.update(data);
  return snapshot;
}

}





