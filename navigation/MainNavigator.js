// navigation/MainNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHome from '../screens/AdminHome';
import CitizenHome from '../screens/CitizenHome';

const Stack = createNativeStackNavigator();

const MainNavigator = ({ role }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {role === 'admin' ? (
      <Stack.Screen name="AdminHome" component={AdminHome} />
    ) : (
      <Stack.Screen name="CitizenHome" component={CitizenHome} />
    )}
  </Stack.Navigator>
);

export default MainNavigator;
