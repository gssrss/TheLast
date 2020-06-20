import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDqJcXNjKfH3ehH9uQn38YEnkDJ3GA1Rg4",
  authDomain: "initial-project-c2308.firebaseapp.com",
  databaseURL: "https://initial-project-c2308.firebaseio.com",
  projectId: "initial-project-c2308",
  storageBucket: "initial-project-c2308.appspot.com",
  messagingSenderId: "487545939155",
  appId: "1:487545939155:web:ce3f0a389625b8ac0e6026",
}

const fire = firebase.initializeApp(firebaseConfig)
export default fire
