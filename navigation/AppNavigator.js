// navigation/AppNavigator.js
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CitizenHome from '../screens/CitizenHome';
import AdminHome from '../screens/AdminHome';
import { account, databases } from '../appwrite';

const AppStack = createStackNavigator();

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get the current session's user
    account.get()
      .then(user => {
        // Use user.$id as the document ID in your "users" collection.
        databases.getDocument('67fe336b0006e4bd3c23', '67fe33bf001f373e0314', user.$id)
          .then((doc) => {
            setUserRole(doc.role); // Assume document contains a "role" field.
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching user role:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        // No valid session
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AppStack.Navigator>
      {userRole === 'admin' ? (
        <AppStack.Screen name="AdminHome" component={AdminHome} options={{ headerShown: false }} />
      ) : (
        <AppStack.Screen name="CitizenHome" component={CitizenHome} options={{ headerShown: false }} />
      )}
    </AppStack.Navigator>
  );
};

export default AppNavigator;
