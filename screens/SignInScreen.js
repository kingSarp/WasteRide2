import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    FirebaseRecaptchaVerifierModal,
    FirebaseRecaptchaBanner,
  } from "expo-firebase-recaptcha";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from "../firebase";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
  



export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Trial");
      }
    });
  });

  const createNewAccount = () => {
    navigation.navigate("SignUp");
  };

  const Login = async () => {
    setLoading(true); // Show loading indicator
    try {
      // Attempt to sign in
      await signInWithEmailAndPassword(auth, email, password);
      // Clear input fields
      setEmail("");
      setPassword("");
      // Navigate to the next screen on successful login
      navigation.replace("Trial");
    } catch (error) {
      // Handle authentication errors
      setLoading(false); // Hide loading indicator
      if (error.code === "auth/user-not-found") {
        Alert.alert("Invalid Email", "The provided email is not registered.");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Incorrect Password", "Please check your password.");
      } else {
        Alert.alert("Error", error.message);
      }
    }

    // if (email && password) {
    //   signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredentials) => {
    //       const user = userCredentials.user;
    //       console.log("logged in :", user.email);
    //     })
    //     .catch((error) => {
    //       if (error.code === "auth/user-not-found") {
    //         Alert.alert("wrong Email", "Enter Correct Mail");
    //       }
    //       if (error.code === "auth/wrong-password") {
    //         Alert.alert("please check password");
    //       }
    //       console.error("error signing in ", error.message);
    //     });
    // }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.label}>Email </Text>
        <TextInput
          placeholder="Email Name"
          autoFocus
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Email"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>

      <Button
        style={styles.button1}
        title={loading ? "Logging in..." : "Login"}
        onPress={Login}
        disabled={loading}
      />
      <Button style={styles.button1} title="Sign In From Google" />
      <Button
        title="Create new account"
        type="outline"
        onPress={createNewAccount}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    justifyContent: "center",

    // alignItems: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,

    padding: 10,
    marginBottom: 20,
  },

  button1: {
    backgroundColor: "#66d237",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
});
