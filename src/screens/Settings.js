import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import { firebase } from '../../Firebase/firebaseConfig';

// EditProfile component
const EditProfile = ({ onPress }) => {
    return (
      <TouchableOpacity style={styles.option} onPress={onPress}>
        <MaterialIcons name="edit" size={20} color="black" style={styles.icon} />
        <Text style={styles.optionText}>My Profile</Text>
      </TouchableOpacity>
    );
  };
  
export default function Settings({ navigation }) {
  const [notification, setNotification] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleNotification = () => {
    setNotification(!notification);
  };

  const resetSettings = () => {
    setNotification(true);
    Alert.alert('Settings Reset', 'All settings have been reset to default.');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const showAboutUs = () => {
    navigation.navigate('about');
  };

  const showPrivacyPolicy = () => {
    navigation.navigate('privacy'); 
  };
  const goToEditProfile = () => {
    // Navigate to the Edit Profile screen
    navigation.navigate('userprofile'); 
  };
  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      alert('you are logged out');
      navigation.navigate('login');
  }).catch((error) => {
      // An error happened.
      alert('Server Issue');
  });
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>

        {/* General Settings */}
        <Text style={styles.sectionTitle}>General Settings</Text>
        <EditProfile onPress={goToEditProfile} />
        <TouchableOpacity style={styles.option} onPress={resetSettings}>
          <Feather name="refresh-cw" size={20} color="black" style={styles.icon} />
          <Text style={styles.optionText}>Reset Settings</Text>
        </TouchableOpacity>

        {/* Notification Settings */}
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        <TouchableOpacity style={styles.option} onPress={toggleNotification}>
          <MaterialIcons name="notifications" size={20} color="black" style={styles.icon} />
          <Text style={styles.optionText}>{notification ? 'Enabled' : 'Disabled'}</Text>
        </TouchableOpacity>

        {/* Dark Mode */}
        <Text style={styles.sectionTitle}>Dark Mode</Text>
        <View style={styles.switchContainer}>
          <MaterialIcons name="brightness-4" size={20} color="black" style={styles.icon} />
          <Text style={styles.optionText}>{darkMode ? 'Enabled' : 'Disabled'}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={darkMode}
          />
        </View>

        {/* App Information */}
        <Text style={styles.sectionTitle}>App Information</Text>
        <TouchableOpacity style={styles.option} onPress={showAboutUs}>
          <MaterialIcons name="info" size={20} color="black" style={styles.icon} />
          <Text style={styles.optionText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={showPrivacyPolicy}>
          <MaterialIcons name="policy" size={20} color="black" style={styles.icon} />
          <Text style={styles.optionText}>Privacy Policy</Text>
        </TouchableOpacity>
       {/* Log Out */}
       <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="black" style={styles.icon} />
          <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>
        </ScrollView>


      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 0,  
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 40,
    left:10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  bottomnav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f0f0f0',
    zIndex: 20,
  },
});
