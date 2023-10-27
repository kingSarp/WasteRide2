import { View, Text, Button } from "react-native";
import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapScreen from "./DrawerNavigationScreens/MapScreen";
import ProfileScreen from "./DrawerNavigationScreens/ProfileScreen";
import PaymentScreen from "./DrawerNavigationScreens/PaymentScreen";
import OrdersScreen from "./DrawerNavigationScreens/OrdersScreen";
import AboutScreen from "./DrawerNavigationScreens/AboutScreen";

const Drawer = createDrawerNavigator();

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button
//         onPress={() => navigation.navigate("Notifications")}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

export default function TrialScreen() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
      
        name="Map"
        component={MapScreen}
        options={{ headerTitle: "" }}
      />
      <Drawer.Screen name="Payment" component={PaymentScreen} />
      <Drawer.Screen name="Requested Trips" component={OrdersScreen}/>
      <Drawer.Screen name="About" component={AboutScreen}/>
    </Drawer.Navigator>
  );
}
