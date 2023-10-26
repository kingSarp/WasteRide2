import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./navigation/AppNavigation";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { UserLocationContext } from "./Context/UserLocationContext";
import { UserProvider, useUser} from "./Context/userContext";

export default function App() {
  const userIsLoggedIn = false; // Replace with actual authentication status

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  return (
    <UserProvider>
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <NavigationContainer>
        <AppNavigation userIsLoggedIn={userIsLoggedIn} />
      </NavigationContainer>
    </UserLocationContext.Provider>
    </UserProvider>

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
