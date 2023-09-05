import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./ProfileScreen";

const Drawer = createDrawerNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.text}>Order Now</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textContent}>
          Level up your waste management and place an order for your waste
          anytime, anyday, anywhere.
        </Text>
      </View>
      <View>
        <Image
          resizeMode="contain"
          style={styles.image} 
          source={require("./../assets/images/Garbage.png")}
        />
      </View>

      <Pressable
        style={styles.button1}
        onPress={() => navigation.navigate("Map")}
      >
        <Text style={{ color: Colors.white }}>Request</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  text: {
    fontSize: 30,
    lineHeight: 40,
    fontWeight: "700",
    color: "#008000",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  textContent: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: "300",
    color: "#263238D9",
    margin: 17,
  },
  image: {
    height: 281,
    width: 292,
    marginTop: 20,
    marginLeft: 25,
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
});
