import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAOyTVGK4UPV7pznLkGh_n6DYnzOLP4JRg",
    authDomain: "auth-bbec6.firebaseapp.com",
    projectId: "auth-bbec6",
    storageBucket: "auth-bbec6.appspot.com",
    messagingSenderId: "6277458986",
    appId: "1:6277458986:web:7a65309adfebec33c42753",
    measurementId: "G-GDLN2KNHXC"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else{
    console.log(firebase.app());

  }
export default firebase;