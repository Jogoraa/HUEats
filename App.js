import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
import Settings from './src/screens/Settings';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PrivacyPolicyScreen from './src/services/PrivacyPolicyScreen';
import AboutScreen from './src/services/About';
import DriverLogin from './src/driver/driverLogin';
import DriverSignup from './src/driver/driverSignup';
import DriverProfile from './src/driver/driverProfile';
import DriverDashboard from './src/driver/driverDashboard';
import DriverMap from './src/driver/DriverMap';
import WebViewScreen from './src/screens/WebViewScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcomepage' screenOptions={{ headerShown: false }}>
        {[
          { name: 'welcomepage', component: WelcomeScreen },
          { name: 'signup', component: SignupScreen },
          { name: 'login', component: LoginScreen },
          { name: 'home', component: HomeScreen },
          { name: 'userprofile', component: Userprofile },
          { name: 'productpage', component: Productpage },
          { name: 'cart', component: UserCart },
          { name: 'placeorder', component: Placeorder },
          { name: 'trackorders', component: TrackOrders },
          { name: 'forgotpassword', component: ForgotPasswordScreen },
          { name: 'settings', component: Settings },
          { name: 'search', component: SearchScreen },
          // { name: 'profile', component: ProfileScreen },
          // { name: 'EditProfile', component: EditProfileScreen },
          { name: 'privacy', component: PrivacyPolicyScreen },
          { name: 'about', component: AboutScreen },
          { name: 'driverlogin', component: DriverLogin },
          { name: 'driversignup', component: DriverSignup },
          { name: 'driverprofile', component: DriverProfile },
          {name:'DriverDashboard', component:DriverDashboard},
          {name:'map', component:DriverMap},
          { name: "WebViewScreen", component: WebViewScreen },


           
        ].map((screen) => (
          <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
