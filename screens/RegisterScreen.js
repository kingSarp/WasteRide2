import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export default function RegisterScreen({ navigation }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const createAccount = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert("Passwords do not match");
        return;
      }

      const auth = getAuth();

      if (password && email) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("Successfully created user with email:", user.email);
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              Alert.alert("Email already in use");
            } else if (error.code === "auth/invalid-email") {
              Alert.alert("Invalid email");
            } else {
              console.error("Error creating account:", error.message);
            }
          });
      } else {
        Alert.alert("Missing data");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // User registration was successful
      console.log("User registered:", userCredential.user);
      // You can navigate to a success screen or perform any other actions here.

      // Add user information to Firestore
      await addDoc(collection(firestore, "User Information"), {
        email: email,
        fullname: fullname,
        password: password,
      });
    } catch (error) {
      console.error("Error creating account:", error);
      // Handle the error, e.g., display an error message to the user.
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          autoFocus
          value={fullname}
          onChangeText={setFullname}
          style={styles.input}
        />
      </View>

      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
      </View>
      <Button
        style={styles.button1}
        title="Create Account"
        onPress={createAccount}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
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
