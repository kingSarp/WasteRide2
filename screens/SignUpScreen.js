import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState, useRef } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";

import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";

import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "../firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

export default function SignUpScreen({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [info, setInfo] = useState("");

  const handleSendVerificationCode = async () => {
    try {
      console.log("Starting to send verification code...");

      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );

      console.log("Verification code sent successfully:", verificationId);

      // Once the verification code is sent successfully, navigate to the OTP input screen
      navigation.navigate("OtpScreen", { verificationId });
    } catch (error) {
      console.log("Error while sending verification code:", error.message);

      setInfo(`Error: ${error.message}`);
    }
  };
  console.log("Rendering SignUpScreen...");

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <TextInput
        style={styles.input}
        placeholder="+2547000000"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        autoFocus
        // value={number}
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />
     
      <Button
        onPress={handleSendVerificationCode}
        title="Send Code"
        disabled={!phoneNumber}
      />
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
