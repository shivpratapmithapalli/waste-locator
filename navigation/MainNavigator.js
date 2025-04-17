// navigation/MainNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const MainNavigator = ({ role }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs">
      {() => <TabNavigator role={role} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default MainNavigator;
