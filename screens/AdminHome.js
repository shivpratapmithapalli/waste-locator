import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { account } from '../appwrite';
import { AuthContext } from '../context/AuthContext';

const AdminHome = () => {
  const { setUser } = useContext(AuthContext);

  const onLogoutPress = () => {
    // Check if a valid session exists then delete it; otherwise, simply clear the auth context.
    account.get()
      .then(() => {
        return account.deleteSession('current');
      })
      .catch((error) => {
        console.log("Logout error (if any):", error.message);
      })
      .finally(() => {
        // Clear the user from the global context; App.js will re-render to show the Auth flow.
        setUser(null);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text>Welcome, Admin!</Text>
      <Button title="Logout" onPress={onLogoutPress} />
    </View>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, marginBottom: 20 },
});
