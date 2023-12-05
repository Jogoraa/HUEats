import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import logo from '../../../assets/logo.png';
import { colors, hr80 } from '../../globals/style';
import { auth, firestore, storage } from '../../../Firebase/firebaseConfig'; // Adjust the path accordingly

import { firebase } from '../../../Firebase/firebaseConfig';
import im7 from '../../../assets/im2.jpg';

const WelcomeScreen = ({ navigation }) => {
  const [userlogged, setUserlogged] = useState(null);

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserlogged(user);
        } else {
          console.log('no user');
        }
      });
    };
    checklogin();
  }, []);

  const handlelogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUserlogged(null);
        console.log('signed out');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ImageBackground source={im7} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>HU-Eats INC</Text>
        <View style={hr80} />
        <Text style={styles.text}>Discover the best food delivered to your doorstep.</Text>
        <View style={hr80} />

        {userlogged === null ? (
          <View style={styles.btnout}>
            <TouchableOpacity onPress={() => navigation.navigate('signup')} style={styles.btn}>
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.btn}>
              <Text style={styles.btnText}>Log In</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.logged}>
            <Text style={styles.txtlog}>
              Signed in as <Text style={styles.txtlogin}>{userlogged.email}</Text>
            </Text>
            <View style={styles.btnoutBottom}>
              <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.btnBottom}>
                <Text style={styles.btnText}>Explore</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlelogout()} style={styles.btnBottom}>
                <Text style={styles.btnText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    color: '#0000', // Coral color
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    width: '80%',
    color: '#fff',
    textAlign: 'center',
  },
  btnout: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 10,
    backgroundColor: '#4CAF50', // Green color
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  logged: {
    alignItems: 'center',
  },
  txtlog: {
    fontSize: 16,
    color: '#fff',
  },
  txtlogin: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },btnoutBottom: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    width: '100%', // Adjusted to take the full width
    paddingHorizontal: 20, // Adjusted horizontal padding
    justifyContent: 'space-evenly', // Evenly space buttons
  },
  btnBottom: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#4CAF50', // Green color
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5, // Adjusted margin
  },
});

export default WelcomeScreen;


