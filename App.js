import { StatusBar } from 'expo-status-bar';
import React from 'react';
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
import ForgotPasswordScreen from './src/screens/LoginSignupScreens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcomepage'>
        {[
          { name: "welcomepage", component: WelcomeScreen },
          { name: "signup", component: SignupScreen },
          { name: "login", component: LoginScreen },
          { name: "home", component: HomeScreen },
          { name: "userprofile", component: Userprofile },
          { name: "productpage", component: Productpage },
          { name: "cart", component: UserCart },
          { name: "placeorder", component: Placeorder },
          { name: "trackorders", component: TrackOrders },
          { name: "forgotpassword", component: ForgotPasswordScreen },
        ].map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{ headerShown: false }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
