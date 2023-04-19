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

  db.collection(collection).add(data)

},


async  getEvents (collection){
  const citiesRef = db.collection(collection);
  const snapshot = await citiesRef.get();
  // snapshot.forEach(doc => {
  // console.log(doc.id, '=>', doc.data());
  // })
  return snapshot;
} ,


async  updateEvents (collection,doc,data){
  const cityRef = db.collection(collection).doc(doc);

// Set the 'capital' field of the city
  const res = await cityRef.update(data);
  return snapshot;
}

}





