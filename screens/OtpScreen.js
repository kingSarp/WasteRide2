import { View, Text, TextInput, Alert, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from '../firebase';

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
      if (error.code === "auth/invalid-verification-code") {
        setInfo("Invalid or expired verification code. Please try again.");
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
        <Text> Haven’t gotten the code yet?</Text>
        <Text style={styles.resendText}>
          Resend Code
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
    padding: 20,
    justifyContent: "center",
    backgroundColor: '#F7F7F7'
  },
  message: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
    color: '#333'
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 45,
  },
  nextContainer: {
    marginTop: "20%",
  },
  resendText: {
    color: "#66d237",
    marginLeft: 5,
    textDecorationLine: 'underline'
  },
  button: {
    backgroundColor: "#66d237",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 105,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  buttonText: {
    color: Colors.white,
  },
  otpcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  inputsContainer: {
    marginBottom: 100,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  info: {
    marginTop: 10,
    color: '#555',
    textAlign: 'center'
  }
});
