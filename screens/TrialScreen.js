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
import { LogOut } from "../Components/Home/LogOut";

const Drawer = createDrawerNavigator();

export default function TrialScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            onPress={() => {
              // Implement your logout logic here
              // For example, clear user session, navigate to the login screen, etc.
              console.log("Logout");
              // You can add your logout logic here, such as clearing user data, navigating, etc.
              // For navigation, you may use props.navigation.navigate("Login") if you have a "Login" screen.
            }}
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
