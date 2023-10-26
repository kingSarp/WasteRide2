






import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { firestore } from "../firebase"

import { collection, addDoc } from "firebase/firestore";
// import { firestore } from "../firebase";


import { UserLocationContext } from "../../Context/UserLocationContext";
import { useUser } from "../../Context/userContext";

export default function GoogleMapView() {
  const [mapRegion, setMapRegion] = useState([]);
  const [pickupLocation, setPickupLocation] = useState(null);

  const { location } = useContext(UserLocationContext);
  const { user } = useUser();

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      });

      setPickupLocation(
        `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`
      );
    }
  }, [location]);

  const requestPickup = () => {
    if (user && pickupLocation) {
      const firestore = firebase.firestore();

      // Create a new pickup request
      firestore
        .collection("pickupRequests")
        .add({
          userId: user.id,
          pickupLocation: pickupLocation,
          status: "Pending", // You can set the initial status here
          pickupDateTime:pickupDateTime
          // Add more details as needed
        })
        .then((docRef) => {
          console.log("Pickup request added with ID: ", docRef.id);
          // Handle success scenarios here.
        })
        .catch((error) => {
          console.error("Error adding pickup request: ", error);
          // Handle error scenarios here.
        });
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
        <Text style={styles.pickupLocationText}>{pickupLocation}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 7, // 70% of the screen
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    flex: 3, // 30% of the screen
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




if (user && pickupLocation) {
  const firestore = firebase.firestore();

  // Create a new pickup request
  firestore
    .collection("pickupRequests")
    .add({
      userId: user.id,
      pickupLocation: pickupLocation,
      status: "Pending", // You can set the initial status here
      pickupDateTime:pickupDateTime
      // Add more details as needed
    })
    .then((docRef) => {
      console.log("Pickup request added with ID: ", docRef.id);
      // Handle success scenarios here.
    })
    .catch((error) => {
      console.error("Error adding pickup request: ", error);
      // Handle error scenarios here.
    });

    console.log("Request Pickup function is executed");
    console.log("User ID: ", user.id);
    console.log("Pickup Location: ", pickupLocation);

    // ... Rest of the function ...
}else {
  console.log("User or Pickup Location is missing");
}


 // const firestoreDb = firebase.firestore();
    // firestoreDb
    //   .collection("pickupRequests")
    //   .add({
    //     userId: user.uid,
    //     pickupLocation: pickupLocation,
    //     status: "Pending",
    //   })
    //   .then((docRef) => {
    //     console.log("Pickup request added with ID: ", docRef.id);
    //     // Handle success scenarios here.
    //   })
    //   .catch((error) => {
    //     console.error("Error adding pickup request: ", error);
    //     // Handle error scenarios here.
    //   });