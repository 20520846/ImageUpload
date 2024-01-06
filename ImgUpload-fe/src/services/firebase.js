import * as firebase from 'firebase/app';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../config/firebase';
import * as firestoreService from "firebase/firestore";

class FireBase{
    constructor(){
        firebase.initializeApp(firebaseConfig);
        this.storage = getStorage();
    }

    storeImage = async (folder, imageFile) => {
        const id = Date.now();
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
}

const FireBaseInstance = new FireBase();

export default FireBaseInstance;