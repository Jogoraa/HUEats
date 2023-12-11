import React from 'react';
import { View, Linking, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';

import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

const AboutScreen = ({ navigation }) => {
    const renderSocialIcon = (type, color, onPress) => {
    let icon;
    switch (type) {
      case 'facebook':
        icon = <FontAwesome name="facebook" size={30} color={color} />;
        break;
      case 'telegram':
        icon = <FontAwesome name="telegram" size={30} color={color} />;
        break;
      case 'phone':
        icon = <Ionicons name="ios-call" size={30} color={color} />;
        break;
      case 'instagram':
        icon = <FontAwesome name="instagram" size={30} color={color} />;
        break;
      default:
        icon = <Text>No Icon</Text>;
    }

    return (
      <TouchableOpacity key={type} onPress={onPress}>
        <View style={styles.iconContainer}>{icon}</View>
      </TouchableOpacity>
    );
  };

  const handleTelegramPress = () => {
    const telegramURL = 'https://t.me/jr_dawit';
    Linking.openURL(telegramURL).catch((err) =>
      console.error('Error opening Telegram link:', err)
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
      <Text style={styles.heading}>About Us</Text>
      <Image
        source={require('../../assets/user.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.aboutText}>
        HU-Eats is your go-to food delivery app within Haramaya University premises.
        Order your favorite meals from local restaurants and have them delivered to your doorstep.


        Our mission is to provide a convenient and efficient way for the university community
        to access a variety of delicious meals.
        

        For inquiries and support, please contact us at davidtjogora@gmail.com.

        Thank you for using HU-Eats!
      </Text>
      <Text style={styles.socialHeading}>Connect with Us</Text>
      <View style={styles.socialIconsContainer}>
        {renderSocialIcon('facebook', '#1877f2', () => {
    const facebookURL = 'https://www.facebook.com/dawit.jogora.98?mibextid=rS40aB7S9Ucbxw6v';
    Linking.openURL(facebookURL).catch((err) =>
            console.error('Error opening Facebook link:', err)
          );
        })}
        {renderSocialIcon('telegram', '#1da1f2', handleTelegramPress)}
        {renderSocialIcon('phone', '#0077b5', () => {
          const phoneNumber = 'tel:+251947635552';
          Linking.openURL(phoneNumber).catch((err) =>
            console.error('Error opening phone link:', err)
          );
        })}
        {renderSocialIcon('instagram', '#bc2a8d', () => {
    const instagramURL = 'https://instagram.com/dave__jogora?igshid=MzMyNGUyNmU2YQ==';
    Linking.openURL(instagramURL).catch((err) =>
            console.error('Error opening Instagram link:', err)
          );
        })}
      </View>
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
      logo: {
        width: '100%',
        height: 200,
        marginBottom: 20,
      },
      aboutText: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 20,
      },
      socialHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      socialIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      iconContainer: {
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
        padding: 10,
      },
      backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
    });
    

export default AboutScreen;
