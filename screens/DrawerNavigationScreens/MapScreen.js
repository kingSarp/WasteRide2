import { View, Image, Text, StyleSheet, Button, Pressable } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import GoogleMapView from "../../Components/Home/GoogleMapView";
import React, { useContext, useEffect, useState } from "react";

export default function MapScreen({ navigation }) {

  return (
    <View style={styles.container}>
      
        <GoogleMapView/>
     
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});