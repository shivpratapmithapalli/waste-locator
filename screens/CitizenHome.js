// screens/CitizenHome.js
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { account } from '../appwrite';
import { AuthContext } from '../context/AuthContext';

const CitizenHome = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);

  const onLogoutPress = () => {
    account.get()
      .then(() => {
        return account.deleteSession('current');
      })
      .catch((error) => {
        console.log("Logout error:", error.message);
      })
      .finally(() => {
        // Clear the user from the global context; App.js will re-render to show the Auth flow.
        setUser(null);
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
  title: { fontSize: 28, marginBottom: 20 },
});
