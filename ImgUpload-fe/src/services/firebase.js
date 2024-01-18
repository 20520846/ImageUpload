import * as firebase from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../config/firebase';
import * as firestoreService from "firebase/firestore";
import * as authService from "firebase/auth";

class FireBase{
    constructor(){
        firebase.initializeApp(firebaseConfig);
        this.storage = getStorage();
        this.auth = authService.getAuth();
    }

    createAccount = async (email, password) => {
        const userCredential = await authService.createUserWithEmailAndPassword(
          this.auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("user", user);
        return user;
    };

    login = async (email, password) => {
        const userCredential = await authService.signInWithEmailAndPassword(
          this.auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("user", user);
        return user;
    };

    logout = async () => {
        await authService.signOut(this.auth);
    };

    onAuthStateChanged = (callback) => {
        authService.onAuthStateChanged(this.auth, callback);
    }

    storeImage = async (imageFile, id) => {
        const imageRef = ref(this.storage, `images/${id}`);
        const uploadTask = uploadBytesResumable(imageRef, imageFile);
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed', 
                (snapshot) => {},               
                (error) => {
                    console.log(error);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL);
                    });
                }
            );
        });
    }

    deleteImage = async (id) => {
        const imageRef = ref(this.storage, `images/${id}`);
        return new Promise((resolve, reject) => {
            imageRef.delete().then(() => {
                resolve();
            }).catch((error) => {
                console.log(error);
            });
        });
    
    }
}

const firebaseInstance = new FireBase();

export default firebaseInstance;