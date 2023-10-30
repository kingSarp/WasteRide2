import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Onboarding2({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("./../assets/images/onboard1.png")}
      />
      <Text style={styles.label}>CONTRIBUTE TO YOUR PLANET</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center", // Center the content both vertically and horizontally.
  },
  image: {
    height: 281,
      width: 292,
      marginTop: 100,
  },
  button: {
    marginTop: 70, // Add margin for separation
    backgroundColor: "#66d237",
    borderRadius: 10,
    padding: 7, // Increase the padding for better touch interaction
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white", // Add text color
    fontSize: 18, // Increase the font size
  },
  label: {
    marginTop: 10, // Add margin for separation
    fontSize: 18, // Increase the font size
    textAlign: "center",
  },
});
