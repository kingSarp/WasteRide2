import { View, Image, Text, StyleSheet, Button, Pressable,   } from "react-native";
import React from 'react'

export default function Onboarding2() {
  return (
    <View style={styles.container}>
    <Image
      resizeMode="contain"
      style={styles.image}
      source={require("./../assets/images/onboard1.png")}
    />
    <Pressable
      style={styles.button1}
      onPress={() => navigation.navigate("Onboard2")}
    >
      <Text > Next</Text>
    </Pressable>
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
  
      justifyContent: "center",
  
      // alignItems: "center",
    },
    image: {
      height: 281,
      width: 292,
      marginTop: 100,
      // marginLeft: 33,
    },
    button1: {
      marginTop: 100,
  
      backgroundColor: "#66d237",
      borderRadius: 10,
      padding: 10,
      alignItems: "center",
      width: "100%",
    },
  });
  