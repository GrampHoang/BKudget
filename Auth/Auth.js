import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        AsyncStorage.setItem('@user', user.email);
        setUser(user);
      } else {
        AsyncStorage.setItem('@user', '0');
        setUser("undefined");
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user
  };
}