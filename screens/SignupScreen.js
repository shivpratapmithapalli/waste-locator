// screens/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { account, databases } from '../appwrite';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignupPress = () => {
    // Create a new user; pass 'unique()' so Appwrite generates a unique ID
    account.create('unique()', email, password, email)
      .then((user) => {
        // Once the user is created, create a document in your "users" collection.
        const data = {
          email,
          role: 'citizen'
        };
        // Use user.$id as the document ID.
        databases.createDocument('67fe336b0006e4bd3c23', '67fe33bf001f373e0314', user.$id, data)
          .then(() => {
            // Account and document created successfully.
          })
          .catch((error) => {
            alert("Error saving user data: " + error.message);
          });
      })
      .catch((error) => {
        alert("Error during signup: " + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up as Citizen</Text>
      <TextInput 
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={onSignupPress} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 32, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  link: { marginTop: 15, textAlign: 'center', color: 'blue' }
});
