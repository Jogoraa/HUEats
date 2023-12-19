import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const DriverProfile = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={require('../../assets/logo.png')}
      />
      <Text style={styles.title}>Driver Profile</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.info}>John Doe</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>dawitjogora88@gmail.com</Text>
      </View>

      {/* Add more profile information as needed */}
    </View>
  );
};

export default DriverProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
});
