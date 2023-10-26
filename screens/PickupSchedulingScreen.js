import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";




export default function PickupSchedulingScreen({ navigation }) {

  const [scheduledPickups, setScheduledPickups] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");

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
        location: pickupLocation,
      };

      setScheduledPickups((prevPickups) => [...prevPickups, newPickup]);
      setPickupDate("");
      setPickupTime("");
      setPickupLocation("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Pickup</Text>
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={pickupLocation}
        onChangeText={setPickupLocation}
      />
      <View style={styles.dateTimeContainer}>
        <Button title="Select Date" onPress={showDatePicker} />
        <Text style={styles.dateTimeText}>{pickupDate}</Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <Button title="Select Time" onPress={showTimePicker} />
        <Text style={styles.dateTimeText}>{pickupTime}</Text>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </View>
      <Button title="Schedule Pickup" onPress={schedulePickup} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateTimeText: {
    fontSize: 16,
  },
  scheduledPickup: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
});
