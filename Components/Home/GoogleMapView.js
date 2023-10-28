import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Alert
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "../../Context/UserLocationContext";
import { useUser } from "../../Context/userContext";
import { collection, addDoc } from "firebase/firestore";
// import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import Constants from 'expo-constants';


import firebase from "firebase/app";
import { firestore } from "../../firebase";

export default function GoogleMapView({ navigation }) {
  const [mapRegion, setMapRegion] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { location } = useContext(UserLocationContext);
  const { user, setUser } = useUser();
  // const apiUrl = process.env.GOOGLE_MAPS_API_KEY;
  const apiKey = Constants.manifest.extra.GOOGLE_MAPS_API_KEY;




  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      });

      const newPickupLocation = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
      setPickupLocation(newPickupLocation);

      console.log("User data:", user);
      setUser(user);

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

    try {
      await addDoc(collection(firestore, "pickupRequests"), {
        userId: user.uid,
        pickupLocation: pickupLocation,
        status: "pending",
      });
      console.log("Pickup request successfully sent.");
      setModalVisible(true);
    } catch (error) {
      console.error("Error requesting pickup:", error);
    }
  };

  if (!user) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Request successfully Booked!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={mapRegion}
          apiKey={apiKey} // Use the apiKey here
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
          <Button title="Scheduled" color="#8DD4A9" onPress={scheduled} />
          <Button title="Ride Options" color="#8DD4A9" />
        </View>
        <Button
          color="#66d237"
          title="Request Pickup"
          onPress={requestPickup}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },
  mapContainer: {
    flex: 6,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    flex: 3,
    padding: 16,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  CarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5
  },
  mini: {
    alignItems: "center",
    flex: 1,
    padding: 10
  },
  large: {
    alignItems: "center",
    flex: 1,
    padding: 10
  },
  rideDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '100%',
    marginTop: 10
  },
  buttonClose: {
    backgroundColor: "#66d237",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    color: '#333'
  },
});
