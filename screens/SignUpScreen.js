import React, { useState, useRef } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { getAuth, PhoneAuthProvider } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from "firebase/auth";
import { firebaseConfig } from "../firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

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
        value={phoneNumber}
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />

      <Button
        onPress={handleSendVerificationCode}
        title="Next"
        disabled={!phoneNumber}
        color="#66d237"
      />
      <View style={styles.orContainer}>
        <View style={styles.dash} />
        <Text>Or</Text>
        <View style={styles.dash} />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.googleButton,
          { backgroundColor: pressed ? "#e3e3e3" : "white" },
        ]}
        onPress={() => {
          // Handle Google sign-in here
        }}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="logo-google" size={24} color="black" />
        </View>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  input: {
    // margin: ,
    // marginTop:30,
    padding: 10,
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  orContainer: {
    margin: 30,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dash: {
    height: 3,
    width: 115,
    backgroundColor: "black",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  iconContainer: {
    marginRight: 10,
  },
  buttonText: {
    color: "black",
  },
});
