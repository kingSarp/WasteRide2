import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewComponent,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen({ navigation}) {
  return (
    <View style={styles.container}>
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="number-pad"
      />
    </View>
    <Pressable
      style={styles.button1}
      onPress={() => navigation.navigate("Otp")}
    >
      <Text style={{ color: Colors.white }}>Next</Text>
    </Pressable>
    <View style={styles.Or}>
      <View style={styles.dash}></View>
      <Text>Or</Text>
      <View style={styles.dash}></View>
    </View>
    <View style={styles.button2}>
      <Ionicons
        name="logo-google"
        size={24}
        color="black"
        style={{ marginRight: 10 }}
      />
      <Text style={{ color: Colors.ash }}> Sign up with Google</Text>
    </View>
  </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
  
      justifyContent: "center",
  
      // alignItems: "center",
    },
  
    button: {
      backgroundColor: Colors.primary,
      padding: 10,
      margin: 30,
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    button1: {
      backgroundColor: "#66d237",
      padding: 10,
      margin: 30,
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    button2: {
      backgroundColor: "white",
      padding: 10,
      margin: 30,
      borderRadius: 10,
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    dash: {
      height: 3,
      width: 110,
      backgroundColor: "black",
    },
    Or: {
      // padding: 10,
      margin: 30,
      borderRadius: 50,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    input: {
      margin: 30,
      padding: 10,
      marginBottom: 10,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
    },
  });
  