import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from "./navigation/AppNavigation";


export default function App() {
  const userIsLoggedIn = false; // Replace with actual authentication status

  return (
    <NavigationContainer>
      <AppNavigation userIsLoggedIn={userIsLoggedIn} />
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

