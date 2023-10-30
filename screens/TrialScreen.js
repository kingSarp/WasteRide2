import React from "react";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView} from "@react-navigation/drawer";
import MapScreen from "./DrawerNavigationScreens/MapScreen";
import PaymentScreen from "./DrawerNavigationScreens/PaymentScreen";
import OrdersScreen from "./DrawerNavigationScreens/OrdersScreen";
import AboutScreen from "./DrawerNavigationScreens/AboutScreen";
import firebase from 'firebase/app';
import {
  getAuth,signOut ,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";


const Drawer = createDrawerNavigator();

export default function TrialScreen({ navigation }) {
  const logout = async () => {
    signOut(auth).then(() => {
      console.log('User signed out!')
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    navigation.navigate('SignIn'); 

  };
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            onPress={logout}
          />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="Map"
        component={MapScreen}
        options={{ headerTitle: "" }}
      />
      <Drawer.Screen name="Payment" component={PaymentScreen} />
      <Drawer.Screen name="Requested Trips" component={OrdersScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}
