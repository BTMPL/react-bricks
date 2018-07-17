import firebase from 'firebase/app'
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBHzb9iETdmTEvsKcU6P6hZFw4Uz6Xp5oE",
  authDomain: "api-project-578098815239.firebaseapp.com",
  databaseURL: "https://api-project-578098815239.firebaseio.com",
  projectId: "api-project-578098815239",
  storageBucket: "api-project-578098815239.appspot.com",
  messagingSenderId: "578098815239"
};
firebase.initializeApp(config);
export default firebase;