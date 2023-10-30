import { View, Image, Text, StyleSheet, Button, Pressable,   } from "react-native";
import React from 'react'

export default function OnBoarding1({ navigation}) {
  return (
    <View style={styles.container}>
    <Image
      resizeMode="contain"
      style={styles.image}
      source={require("./../assets/images/onboard3.png")}
    />
          <Text style={styles.label}>SCHEDULE YOUR PICK UP</Text>

    <Pressable
      style={styles.button1}
      onPress={() => navigation.navigate("Onboarding2")}
    >
        <Text style={styles.buttonText}>Next</Text>
    </Pressable>
  </View>
  )
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
    button1: {
      marginTop: 100,
  
      backgroundColor: "#66d237",
      borderRadius: 10,
      padding: 10,
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
  