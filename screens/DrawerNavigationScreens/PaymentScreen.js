import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  Button,
} from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

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
          <Image source={require("../../assets/images/visa.png")} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: "center",

    // justifyContent: "center",
  },
  coupon: {
    height: "20%",
    width: "90%",
    // backgroundColor: "green",
  },
  label: {
    fontSize: 20,
    lineHeight: 40,
    fontWeight: "400",
  },
  inputbtn: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    width: "60%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },

  button1: {
    width: "37%",
    height: "75%",
    backgroundColor: "black",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  apply: {
    color: "white",
  },

  line: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
  pm: {
    fontSize: 15,
    lineHeight: 40,
    fontWeight: "400",
    paddingBottom: 20,
  },
  image: {
    height: 281,
    width: 292,
    marginTop: 20,
    marginLeft: 25,
  },
  cardinfo: {
    flexDirection: "row",
    gap: 10,
    paddingBottom: 25,
  },
});
