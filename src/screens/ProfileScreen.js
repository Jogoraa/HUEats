import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, TextInput } from 'react-native';
import { firebase } from '../../Firebase/firebaseConfig';
import { AntDesign } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserloggeduid(user.uid);
        } else {
          console.log('no user');
        }
      });
    }
    checklogin();
  }, [])

  const getuserdata = async () => {
    const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
    const doc = await docRef.get();
    if (!doc.empty) {
      doc.forEach((doc) => {
        setUserdata(doc.data());
      })
    }
    else {
      console.log('no user data');
    }
  }

  useEffect(() => {
    getuserdata();
  }, [userloggeduid]);

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  }

  if (!userdata) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{ uri: userdata.profileImageUrl }}
          />
        <Text style={styles.name}>{userdata.name}</Text>
        <Text style={styles.subtitle}>{userdata.jobTitle}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.detail}>{userdata.email}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>Phone</Text>
        <Text style={styles.detail}>{userdata.phone}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>Address</Text>
        <Text style={styles.detail}>{userdata.address}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>Date of Birth</Text>
        <Text style={styles.detail}>{userdata.dateOfBirth}</Text>
      </View>

      <TouchableOpacity onPress={navigateToEditProfile}>
        <View style={styles.editProfileButton}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 16,
    color: '#999',
  },
  editProfileButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProfileScreen;
