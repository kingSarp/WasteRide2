import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useUser } from "../Context/userContext";
import { auth } from "../firebase";



export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { setUser } = useUser(); // Get the setUser function from the context

  // Check if the user is already authenticated, and navigate to the next screen if so
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {


        // Set the user data in the context if the user is already authenticated
        setUser(user);
        navigation.replace("Trial");
      }
    });
  },[]);// Add an empty dependency array to run this effect only once

  const createNewAccount = () => {
    navigation.navigate("SignUp");
  };

  const login = async () => {
    if (loading) return; // Prevent multiple login attempts
    setLoading(true);

    try {
      // Attempt to sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
     
       // Set the user data in the context
       setUser(userCredential.user);
     
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          autoFocus
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
      <View style={styles.boxContainer}>
        <View style={styles.checkboxContainer}>
          <Checkbox value={rememberMe} onValueChange={setRememberMe} />
          <Text style={styles.checkboxLabel}>Remember Me</Text>
        </View>

        <View style={styles.forgotPasswordContainer}>
          <Text
            style={styles.forgotPasswordLabel}
            onPress={() => {
              // Implement the "Forgot Password" functionality here
            }}
          >
            Forgot Password
          </Text>
        </View>
      </View>
      <Button
        color="#66d237"
        title={loading ? "Logging in..." : "Login"}
        onPress={login}
        disabled={loading}
      />

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

      <View style={styles.signUpLink}>
        <Text>Don't have an account? </Text>
        <Text style={{ color: "#66d237" }} onPress={createNewAccount}>
          Sign up
        </Text>
      </View>
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
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  iconContainer: {
    marginRight: 10,
  },
  buttonText: {
    color: "black",
  },
  boxContainer: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  forgotPasswordLabel: {
    color: "#66d237",
  },
  signUpLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
