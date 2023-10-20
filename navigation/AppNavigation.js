import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from "../screens/SplashScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import OtpScreen from "../screens/OtpScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PasswordScreen from "../screens/PasswordScreen";
import TrialScreen from "../screens/TrialScreen";
// import HomeScreen from '../screens/HomeScreen';
// import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="Trial" component={TrialScreen} />
      {/* <Stack.Screen name="Map" component={MapScreen} /> */}
    </Stack.Navigator>
  );
}
