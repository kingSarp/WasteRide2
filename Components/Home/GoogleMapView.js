import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "../../Context/UserLocationContext";
import { useUser } from "../../Context/userContext";
import { collection, addDoc } from "firebase/firestore";
import Constants from "expo-constants";
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install this package
import { firestore } from "../../firebase";

export default function GoogleMapView() {
  const [mapRegion, setMapRegion] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { location } = useContext(UserLocationContext);
  const { user, setUser } = useUser();
  const apiKey = Constants.manifest.extra.GOOGLE_MAPS_API_KEY;
  const navigation = useNavigation();

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

      setUser(user);
    }
  }, [location]);

  const scheduled = () => {
    navigation.navigate("Scheduling");
  };

  const requestPickup = async () => {
    if (!user || !pickupLocation) {
      Alert.alert("Error", "User or Pickup Location is missing.");
      return;
    }

    try {
      await addDoc(collection(firestore, "pickupRequests"), {
        userId: user.uid,
        pickupLocation: pickupLocation,
        status: "pending",
      });
      setModalVisible(true);
    } catch (error) {
      Alert.alert("Error", "Error requesting pickup: " + error.message);
    }
  };

  if (!user) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={25} color="#333" />
      </TouchableOpacity>

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
            <Text style={styles.modalText}>Request successfully booked!!</Text>
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
          Choose a convenient waste collector
        </Text>
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
    backgroundColor: "#F7F7F7",
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
    backgroundColor: "#FFF",
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
  backButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + 0, //10 better positioning for status bar height
    left: 20,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  rideDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "80%",
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
    width: "100%",
    marginTop: 10,
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
    color: "#333",
  },
  // You can add or refine styles as needed.
});
