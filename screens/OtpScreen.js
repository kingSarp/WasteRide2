import { View, Text, Image, TextInput, Alert, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { getAuth , PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { firebaseConfig } from "../firebase";

const app = initializeApp(firebaseConfig);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default function OtpScreen({ navigation, route }) {
  const { verificationId } = route.params;
  const [verificationCode, setVerificationCode] = useState("");
  const [info, setInfo] = useState("");
  const attemptInvisibleVerification = false;

  const handleVerifyVerificationCode = async () => {
    try {
      console.log(" verification code...");

      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );

      console.log("Verification code  successfully:", verificationId);

      await signInWithCredential(auth, credential);
      setInfo("Success: Phone authentication successful");

      navigation.navigate("Register");
    } catch (error) {
      console.log("Error while sending verification code:", error.message);
      // setInfo(`Error: ${error.message}`);
      if (error.code === "auth/invalid-verification-code") {
        // Handle incorrect or expired code
        setInfo("Invalid or expired verification code. Please try again.");
        // You can also provide the user with an option to request a new code here.
      } else {
        console.error("Error while failed verification code:", error);
        setInfo(`Error: ${error.message}`);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.message}>
        Enter the 5-digit code that has been sent to {info}
      </Text>

      <View style={styles.otpcontainer}>
        <TextInput
          style={styles.input}
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={setVerificationCode}
        />
      </View>
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>
          Haven’t gotten the code yet? Resend Code
        </Text>
      </View>
      <View style={styles.nextContainer}>
        <Button
          style={styles.button}
          onPress={handleVerifyVerificationCode}
          title="verify code"
          disabled={!verificationCode}
        />
              <Text style={styles.info}>{info}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginBottom: 30,
    textAlign: "center",
  },

  resendContainer: {
    marginBottom: 45,
  },
  nextContainer: {
    marginTop: "20%",
  },
  resendText: {
    color: Colors.dark,
  },

  button: {
    backgroundColor: "#66d237",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 105,
    // width:"50%"
  },
  buttonText: {
    color: Colors.white,
  },

  otpcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    // padding: 20
  },
  inputsContainer: {
    marginBottom: 100,
  },
  input: {
    margin: 30,
    padding: 10,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  }
});
