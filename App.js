// App.js
import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
import { account } from './appwrite';
import { AuthContext, AuthProvider } from './context/AuthContext';

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // See if there's an active session
        await account.getSession('current');
        // Retrieve the user data including preferences
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    checkSession();
  }, [setUser]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        // Pass the role based on user preferences: user.prefs.label
        <MainNavigator role={user.prefs?.label} />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
