
import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBH3BmDMw0w6MPIgu7igMNIG2xal6BmYKQ",
  authDomain: "managerexpenses-90a7d.firebaseapp.com",
  projectId: "managerexpenses-90a7d",
  storageBucket: "managerexpenses-90a7d.appspot.com",
  messagingSenderId: "455750858876",
  appId: "1:455750858876:web:5cc0eacc6ae697aefc31f9"
}

let app
if ((firebase.apps.length === 0)) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = app.firestore()

export {auth, db}
  