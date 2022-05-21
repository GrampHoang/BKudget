import React from 'react';
import { useAuthentication } from './Auth.js';
import HomeStack from './HomeStack.js';
import AuthStack from './AuthStack.js';

export default function AppStack() {
  const { user } = useAuthentication();
  return user ? <HomeStack /> : <AuthStack />;
}