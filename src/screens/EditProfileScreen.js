import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { firebase } from '../../Firebase/firebaseConfig';

const EditProfileScreen = ({ navigation, route }) => {
  const [userloggeduid, setUserloggeduid] = useState(null);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserloggeduid(user.uid);
        } else {
          console.log('no user');
        }
      });
    };
    checklogin();
  }, []);

  useEffect(() => {
    getuserdata();
  }, [userloggeduid]);

  useEffect(() => {
    if (route.params?.userData) {
      const { name, address } = route.params.userData;
      setNewName(name);
      setNewAddress(address);
    }
  }, [route.params]);

  const getuserdata = async () => {
    try {
      const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid);
      const doc = await docRef.get();

      if (!doc.empty) {
        doc.forEach((doc) => {
          setNewName(doc.data().name);
          setNewAddress(doc.data().address);
        });
      } else {
        console.log('no user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const updateProfile = async () => {
    try {
      if (!userloggeduid) {
        console.error('User not logged in.');
        return;
      }

      const userRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid);
      const snapshot = await userRef.get();

      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          doc.ref.update({
            name: newName,
            address: newAddress,
          });
        });

        alert('Profile updated successfully!');
        navigation.goBack();
      } else {
        console.error('User data not found.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const updatePassword = async () => {
    try {
      const user = firebase.auth().currentUser;

      if (!user) {
        console.error('User not logged in.');
        return;
      }

      const reauthenticate = () => {
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
        return user.reauthenticateWithCredential(cred);
      };

      await reauthenticate();
      await user.updatePassword(newPassword);

      alert('Password updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password. Please try again.');
    }
  };

  const updateAll = async () => {
    try {
      await updateProfile();
      await updatePassword();
    } catch (error) {
      console.error('Error updating profile and password:', error);
      alert('Failed to update profile and password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#333" />
        </View>
      </TouchableOpacity>

      <Text style={styles.heading}>Edit Your Profile</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newName}
          onChangeText={(text) => setNewName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={newAddress}
          onChangeText={(text) => setNewAddress(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry
          onChangeText={(text) => setOldPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          onChangeText={(text) => setNewPassword(text)}
        />
      </View>

      <TouchableOpacity onPress={() => updateAll()}>
        <View style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update All</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  updateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default EditProfileScreen;
