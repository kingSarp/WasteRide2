import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "../../Context/UserLocationContext";
import { useUser } from "../../Context/userContext";
import { collection, addDoc } from "firebase/firestore";
import firebase from "firebase/app";
import { firestore } from "../../firebase";

export default function GoogleMapView({ navigation }) {
  const [mapRegion, setMapRegion] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);

  const { location } = useContext(UserLocationContext);
  const { user, setUser } = useUser();

  useEffect(() => {
    if (location) {
      // Set map region if location is available
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      });

      // Set pickup location using template string
      const newPickupLocation = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
      setPickupLocation(newPickupLocation);

      // Set the user data here
      console.log("User data:", user); // Log the user data
      setUser(user);

      // Debug logs
      console.log("Location available:", location);
      console.log("Pickup Location:", pickupLocation);
    } else {
      console.log("Location is missing.");
    }
  }, [location]);

  const scheduled = () => {
    navigation.navigate("Scheduling");
  };
  const requestPickup = async () => {
    if (!user || !pickupLocation) {
      console.log("User or Pickup Location is missing.");
      return;
    }

    console.log(
      "Requesting pickup with user:",
      user.uid,
      "and pickup location:",
      pickupLocation
    );
    // Add user information to Firestore
    try {
      await addDoc(collection(firestore, "pickupRequests"), {
        userId: user.uid,
        pickupLocation: pickupLocation,
        status: "pending",
      });
      console.log("Pickup request successfully sent.");
    } catch (error) {
      console.error("Error requesting pickup:", error);
      // Handle the error, e.g., display an error message to the user.
    }
  };

  if (!user) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={mapRegion}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={{ marginLeft: 60 }}>
          Choose a convient waste collector
        </Text>
        <View style={styles.CarContainer}>
          <View style={styles.mini}>
            <Image
              resizeMode="contain"
              source={require("../../assets/images/mini.png")}
            />
            <Text>Mini</Text>
          </View>
          <View style={styles.large}>
            <Image
              resizeMode="contain"
              source={require("../../assets/images/large.jpg")}
            />
            <Text>Large</Text>
          </View>
        </View>
        <View style={styles.rideDetails}>
          <Button title="Scheduled" color="#8DD4A9"  />
          <Button title="Ride Options" color="#8DD4A9" />
        </View>
        {/* <Text style={styles.label}>Pickup Location (Current Location):</Text> */}
        <Button
          color="#66d237"
          title="Request Pickup"
          onPress={requestPickup}
        />
        {/* <Text style={styles.pickupLocationText}>
          {pickupLocation || "Waiting for location data..."}
        </Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 7,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    flex: 3,
    padding: 16,
  },
  label: {
    fontSize: 16,
  },
  pickupLocationText: {
    marginTop: 5,
    fontSize: 14,
  },
  CarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "space-around",
    marginTop: 3
  },
  mini: {
    // alignContent:"center",
    alignItems: "center",
    // marginRight:30
  },
  large: {
    alignContent: "center",
    alignItems: "center",
    marginRight: 75,
  },
  rideDetails: {
    flexDirection: "row",
    // alignContent: "space-between",
    justifyContent: "space-around",
    marginTop:3
  },
});
