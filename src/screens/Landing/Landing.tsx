import React, { useEffect, useState } from 'react';
import { firebaseConfig } from "../../Firebase";
import { initializeApp } from "firebase/app";
import { getApps, getApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut as firebaseSignOut, User } from 'firebase/auth';
export const Landing: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    
    const auth = getAuth(app);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          localStorage.setItem('user', result.user.displayName || '')
          localStorage.setItem('icon', result.user.photoURL || '')
        } catch (error) {
          console.error('Error during sign-in:', error);
        }
        handleGoogleAuth();
      };

    const handleGoogleAuth = () => {
        // Implement Google authentication logic here
        setIsAuthenticated(true);
    };

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        localStorage.setItem('phoneNumber', phoneNumber);
        if(phoneNumber.length > 0){
            window.location.reload();
        }
        
        // Implement logic to handle phone number submission here
    };

    return (
        <div>
            {!isAuthenticated ? (
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Phone Number:
                        <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange}/>
                    </label>

                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};
