import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "../../Context/UserLocationContext";
import { useUser } from "../../Context/userContext";
import { collection, addDoc } from "firebase/firestore";
import firebase from "firebase/app";
import { firestore } from "../../firebase";

export default function GoogleMapView() {
  const [mapRegion, setMapRegion] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);

  const { location } = useContext(UserLocationContext);
  const { user , setUser } = useUser();

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
  }, [location, user]);

  const requestPickup = async (user, pickupLocation) => {
    if (!user || !pickupLocation) {
      console.log("User or Pickup Location is missing.");
      return;
    }

    console.log("Requesting pickup with user:", user.uid, "and pickup location:", pickupLocation);
    // Add user information to Firestore
    try {
      await addDoc(collection(firestore, "pickupRequests"), {
        userId: user.uid,
        pickupLocation: pickupLocation,
        status: "pending",
      });
    } catch (error) {
      console.error("Error requesting pickup:", error);
      // Handle the error, e.g., display an error message to the user.
    }
  };
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
        <Text style={styles.label}>Pickup Location (Current Location):</Text>
        <Button title="Request Pickup" onPress={requestPickup} />
        <Text style={styles.pickupLocationText}>
          {pickupLocation || "Waiting for location data..."}
        </Text>
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
    marginTop: 8,
    fontSize: 14,
  },
});
