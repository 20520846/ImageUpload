import { createContext, useState, useEffect } from 'react';
import firebaseInstance from '../services/firebase';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = firebaseInstance.onAuthStateChanged((user) => {
            setCurrentUser(user);
            console.log(user);
        });

        return () => {
            unsub();
        };

    }, []);

    return(
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};