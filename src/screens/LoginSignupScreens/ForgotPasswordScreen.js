import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { firebase } from '../../../Firebase/firebaseConfig';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [resetPasswordError, setResetPasswordError] = useState('');

  const handleForgotPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      console.log('Password reset email sent successfully.');

      // Show a success alert
      Alert.alert(
        'Success',
        'Password reset email sent successfully.',
        [{ text: 'OK', onPress: () => navigation.navigate('login') }]
      );
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      setResetPasswordError('Error sending password reset email. Please try again.');

      // Show an error alert
      Alert.alert(
        'Error',
        'Error sending password reset email. Please try again.',
        [{ text: 'OK', onPress: () => {} }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email to reset your password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      {resetPasswordError !== '' && <Text style={styles.errorText}>{resetPasswordError}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Send Reset Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
