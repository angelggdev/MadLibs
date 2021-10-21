import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCb3Cl7J8vjkfCQlMj3zBKaEm2noKAi0-g",
    authDomain: "madlibs-92449.firebaseapp.com",
    projectId: "madlibs-92449",
    storageBucket: "madlibs-92449.appspot.com",
    messagingSenderId: "912018014307",
    appId: "1:912018014307:web:77e427d21d885f033b7856"
};

firebase.initializeApp(firebaseConfig);

export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            resolve(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject([errorCode, errorMessage])
        });
    })
}

