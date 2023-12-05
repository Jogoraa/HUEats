import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, SectionList } from 'react-native';

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/LoginSignupScreens/WelcomeScreen';
import SignupScreen from './src/screens/LoginSignupScreens/SignupScreen';
import LoginScreen from './src/screens/LoginSignupScreens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import Userprofile from './src/screens/Userprofile';
import Productpage from './src/screens/Productpage';
import UserCart from './src/screens/UserCart';
import Placeorder from './src/screens/Placeorder';
import TrackOrders from './src/screens/TrackOrders';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcomepage'>
      <Stack.Screen
  name="welcomepage"
  component={WelcomeScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="signup"
  component={SignupScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="login"
  component={LoginScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="home"
  component={HomeScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="userprofile"
  component={Userprofile}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="productpage"
  component={Productpage}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="cart"
  component={UserCart}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="placeorder"
  component={Placeorder}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="trackorders"
  component={TrackOrders}
  options={{ headerShown: false }}
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const DATA = [
  {
    title: "Screens",
    data: [
      { key: "welcomepage", component: WelcomeScreen, options: { headerShown: false } },
      { key: "signup", component: SignupScreen, options: { headerShown: false } },
      { key: "login", component: LoginScreen, options: { headerShown: false } },
      { key: "home", component: HomeScreen, options: { headerShown: false } },
      { key: "userprofile", component: Userprofile, options: { headerShown: false } },
      { key: "productpage", component: Productpage, options: { headerShown: false } },
      { key: "cart", component: UserCart, options: { headerShown: false } },
      { key: "placeorder", component: Placeorder, options: { headerShown: false } },
      { key: "trackorders", component: TrackOrders, options: { headerShown: false } },
    ],
  },
];

const Item = ({ component, options }) => (
  <Stack.Screen name={component.name} component={component} options={options} />
);

const AppSectionList = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar style="auto" />
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item {...item} />}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
      )}
    />
  </SafeAreaView>
);
