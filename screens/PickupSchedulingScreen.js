import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install this package
import { useNavigation } from "@react-navigation/native";

export default function PickupSchedulingScreen() {
  const [scheduledPickups, setScheduledPickups] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");

  const navigation = useNavigation();

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setPickupDate(date.toDateString());
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    setPickupTime(time.toTimeString());
    hideTimePicker();
  };

  const schedulePickup = () => {
    if (pickupDate && pickupTime && pickupLocation) {
      const newPickup = {
        date: pickupDate,
        time: pickupTime,
        location: pickupLocation
      };

      setScheduledPickups(prevPickups => [...prevPickups, newPickup]);
      setPickupDate("");
      setPickupTime("");
      setPickupLocation("");
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={25} color="#333" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Schedule Pickup</Text>

        <TextInput
          style={styles.input}
          placeholder="Location"
          value={pickupLocation}
          onChangeText={setPickupLocation}
        />

        <View style={styles.dateTimeContainer}>
          <TouchableOpacity style={styles.button} onPress={showDatePicker}>
            <Text style={styles.buttonText}>Select Date</Text>
          </TouchableOpacity>
          <Text style={styles.dateTimeText}>{pickupDate}</Text>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />

          <TouchableOpacity style={styles.button} onPress={showTimePicker}>
            <Text style={styles.buttonText}>Select Time</Text>
          </TouchableOpacity>
          <Text style={styles.dateTimeText}>{pickupTime}</Text>

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={schedulePickup}>
          <Text style={styles.primaryButtonText}>Schedule Pickup</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Scheduled Pickups</Text>

        <FlatList
          data={scheduledPickups}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.scheduledPickup}>
              <Text>Date: {item.date}</Text>
              <Text>Time: {item.time}</Text>
              <Text>Location: {item.location}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  backButton: {
    position: 'absolute',
    top: 20, // or use safe area view if needed
    left: 10,
    zIndex: 10,
  },
  content: {
    marginTop: 60, // adjust accordingly to your header's height
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#FFF',
    width: '100%',
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%',
    marginBottom: 20
  },
  dateTimeText: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#333'
  },
  primaryButton: {
    backgroundColor: '#66d237',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  scheduledPickup: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: '100%',
    marginBottom: 20
  },
});
