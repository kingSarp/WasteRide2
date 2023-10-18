import { View, Text, TextInput, Image, Pressable } from "react-native";
import React from "react";
import { styles } from "./PaymentScreen";

export default function PaymentScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.coupon}>
        <Text style={styles.label}>Apply Coupon</Text>
        <View style={styles.inputbtn}>
          <TextInput style={styles.input} placeholder="" />
          <Pressable style={styles.button1}>
            <Text style={styles.apply}>Apply</Text>
          </Pressable>
        </View>
        <View style={styles.line}></View>
      </View>
      <View style={styles.coupon}>
        <Text style={styles.pm}>Payment Methods</Text>
        <View style={styles.cardinfo}>
          <Image source={require("./assets/icon.png")} />
          <View>
            <Text>*******44444</Text>
            <Text>Expires 04/23</Text>
          </View>
        </View>
        <View style={styles.line}></View>
      </View>
    </View>
  );
}
