// screens/AdminHome.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { account } from '../appwrite';

const AdminHome = () => {
  const onLogoutPress = () => {
    account.deleteSession('current')
      .then(() => {
        // User logged out
      })
      .catch((error) => {
        alert(error.message);
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
  title: { fontSize: 28, marginBottom: 20 }
});
