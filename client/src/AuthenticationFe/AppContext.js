import React, { createContext, useEffect, useState } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase';
import 'firebase/auth';

export const AppContext = createContext(null);

var firebaseConfig = {
  apiKey: "AIzaSyASOueUbIqLX2JGqcEC-0PsLE770JdwpF4",
  authDomain: "user-app-4687c.firebaseapp.com",
  databaseURL: "https://user-app-4687c.firebaseio.com",
  projectId: "user-app-4687c",
  storageBucket: "user-app-4687c.appspot.com",
  messagingSenderId: "242664590877",
  appId: "1:242664590877:web:0f16f2e4e8b271444f00f4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState('');

  const handleSignOut = () => {
    signOut();
    setAppUser({});
    setMessage("");

  };



  useEffect(() => {
    if (user) {
      console.log('user', user);
      fetch(`/users`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setAppUser(json.data);
          setMessage(json.message);
        });
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{ appUser, signInWithGoogle, handleSignOut, message }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
  firebaseApp
})(AppProvider);
