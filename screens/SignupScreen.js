// screens/SignupScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { account } from '../appwrite';
import { AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignupPress = () => {
    // Step 1: Create user with unique() ID, email, password, and name = email
    account.create('unique()', email, password, email)
      .then(async (user) => {
        // Step 2: Update the user's preferences to set label = "citizen"
        await account.updatePrefs({ label: 'citizen' });
        
        // Step 3: Immediately create a session so the user is logged in
        await account.createEmailPasswordSession(email, password);

        // Step 4: Retrieve the updated user object (which should now have prefs.label = 'citizen')
        const updatedUser = await account.get();
        setUser(updatedUser);

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
