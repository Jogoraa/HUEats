import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';

const PrivacyPolicyScreen = ({ navigation }) => {
 const [accepted, setAccepted] = useState(false);

 const handleAccept = () => {
    setAccepted(true);
    // Save user preference or navigate to the main app screen
    // For simplicity, we'll just show an alert here.
    Alert.alert('Accepted', 'Thank you for accepting the Privacy Policy!');
    // You might want to save the acceptance state to AsyncStorage or similar.
 };

 const handleDecline = () => {
    // Handle the case where the user declines the Privacy Policy.
    Alert.alert('Declined', 'You must accept the Privacy Policy to use the app.');
 };

 const goBack = () => {
    navigation.goBack();
 };

 const privacyPolicyText = `
     1. Order Processing:
    We collect and use user info for food orders and delivery within Haramaya University.

    2. Limited Sharing:
    User details are shared with restaurants and delivery for order fulfillment only.

    3. Data Security:
    Standard measures protect your information within Haramaya University.

    4. Cookies & Preferences:
    Cookies enhance app experience; manage preferences in settings.
    5. Third-Party Links:
    We're not responsible for privacy in third-party links.

    6. Opt-Out:
    Manage promotional communications in app settings.

    7. Updates:
    Users will be notified of major policy changes.

    8. Age Restriction:
    The app is for users 13 and above within Haramaya University.

    9. Contact:
     For inquiries, reach us at [insert contact].

    By using HU-Eats, users agree to these terms within Haramaya University premises.
 `;

 return (
    <View style={styles.container}>
      
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <TouchableOpacity onPress={goBack}>
      <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView style={styles.content}>
        <Text style={styles.heading}>Privacy Policy</Text>
        <View style={styles.contentContainer}>
          <Text>{privacyPolicyText}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: '#007BFF',
    marginBottom: 10,
  },
  listItem: {
    marginBottom: 15,
  },
  listItemText: {
    fontSize: 16,
    lineHeight: 22,
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  contact: {
    fontWeight: 'bold',
    color: '#333',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  declineButton: {
    backgroundColor: '#DD2C00',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  privacyPolicyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 10,
  },
});

export default PrivacyPolicyScreen;
