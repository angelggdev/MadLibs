import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const addStory = (_story, storyName) => {
    return new Promise((resolve, reject) => {
        db.collection(sessionStorage.getItem('user')).add({
            title: storyName,
            story: _story
        })
        .then((docRef) => {
            resolve(docRef);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

export const getStories = () => {
    return new Promise((resolve, reject) => {
        let stories = [];
        db.collection(sessionStorage.getItem('user')).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let id = doc.id;
                let story = {id, ...doc.data()}
                stories.push(story);
            })
            resolve(stories)
        })
        .catch((error) => {
            reject(error);
        })
    })   
}

export const removeStory = (username, storyID) => {
    return new Promise((resolve, reject) => {
        db.collection(username).doc(storyID).delete().then(() => {
            resolve("Document successfully deleted!");
        }).catch((error) => {
            reject("Error removing document: ", error);
        });
    })
}

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

export const register = (email, password) => {
    return new Promise ((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                resolve(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                reject([errorCode, errorMessage])
            });
    })
}

