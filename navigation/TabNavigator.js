// navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import your screens
import AdminHome from '../screens/AdminHome';
import CitizenHome from '../screens/CitizenHome';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';

// A wrapper that chooses which Home screen to render
const HomeScreenWrapper = ({ role }) => {
  return role === 'admin' ? <AdminHome /> : <CitizenHome />;
};

const Tab = createBottomTabNavigator();

export default function TabNavigator({ role }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Configure the icons for each tab.
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home">
        {() => <HomeScreenWrapper role={role} />}
      </Tab.Screen>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
