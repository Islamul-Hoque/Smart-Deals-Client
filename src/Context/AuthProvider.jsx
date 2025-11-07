import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword,  GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

export const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('email') 

const AuthProvider = ( {children} ) => {
    const [ user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = ( email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword( auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    }

    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup( auth, googleProvider )
    }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                const email = currentUser.email || currentUser.providerData?.[0]?.email;
                setUser({ ...currentUser, email });
                    const loggedUser = { email: currentUser.email }
                    fetch('https://smart-deals-api-server-weld.vercel.app/getToken', {
                        method: 'POST',
                        headers: {
                            'Content-type' : 'application/json'
                        },
                        body: JSON.stringify(loggedUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log( 'after getting token' ,data.token);

                            // Step-2: Token store
                            localStorage.setItem('token', data.token)
                            setLoading(false);
                        })
                        .catch(err => {
                            console.error("JWT fetch failed:", err)
                            localStorage.removeItem('token');
                            setLoading(false);
                        })
            } 
            else {
                setUser(null);
                localStorage.removeItem('token');
                setLoading(false);
            }
        });
    return () => unsubscribe();
}, []);



    const userInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signInUser,
        updateUser,
        googleSignIn,
        signOutUser,
        forgotPassword
    }

    return (
        <AuthContext.Provider value={userInfo}> 
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;