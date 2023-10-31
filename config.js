
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore';
export const BASE_URL='http://127.0.0.1:8000/api/';
export const firebaseConfiguration={
        apiKey: "AIzaSyDdKmJnvkVODuHK8qddfHjZ2JePWBoDf8g",
        authDomain: "verficatication.firebaseapp.com",
        projectId: "verficatication",
        storageBucket:"verficatication.appspot.com",
        messagingSenderId: "512588539834",
        appId: "1:512588539834:web:847468b4619ec696689f83",
        measurementId: "G-54NM6DR497"
      
}
if(firebase.apps.length){
    firebase.initializeApp(firebaseConfiguration)
}