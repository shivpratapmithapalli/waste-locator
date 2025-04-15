// screens/CitizenHome.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { account } from '../appwrite';

const CitizenHome = () => {
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
      <Text style={styles.title}>Citizen Home</Text>
      <Text>Welcome, citizen!</Text>
      <Button title="Logout" onPress={onLogoutPress} />
    </View>
  );
};

export default CitizenHome;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, marginBottom: 20 }
});
