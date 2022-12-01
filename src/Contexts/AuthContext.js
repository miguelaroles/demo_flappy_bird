import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createContext, useCallback, useState, useEffect } from "react";

/* /!\ add .env to your .gitignore in real life /!\ */
/* for demonstration purposes only */
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const authChanged = useCallback((firebaseUser) => {
        if (firebaseUser) setUser(firebaseUser);
        setInitializing(false);

        console.log({ firebaseUser });
    }, []);

    useEffect(() => {
        return onAuthStateChanged(auth, authChanged);
    }, [authChanged]);

    const signIn = async (newUser, successCallback, errorCallback) => {
        setInitializing(true);
        try {
            let res = await signInWithEmailAndPassword(
                auth,
                newUser.email,
                newUser.password
            );
            if (res.user) return successCallback();

            return errorCallback("Wrong credentials");
        } catch (error) {
            return errorCallback("Something went Wrong.");
        }
    };

    const signOut = async (callback) => {
        await signOut(auth);
        setUser(null);
        callback();
    };

    return (
        <AuthContext.Provider value={{ initializing, user, signIn, signOut, db }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };
export default AuthProvider;