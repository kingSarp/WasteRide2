import { View, Text,   StyleSheet,  Pressable,TextInput, } from 'react-native'
import React from 'react'
import { Colors } from "react-native/Libraries/NewAppScreen";


export default function PasswordScreen({ navigation}) {
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Set Password</Text>
      <Text style={styles.label}>
        Set your account password. Choose something secure and easy to
        remember.
      </Text>
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Password"
        secureTextEntry={true} // For password masking
      />
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true} // For password masking
      />
    </View>
    <Pressable
      style={styles.button}
      onPress={() => navigation.navigate("Trial")}
    >
      <Text style={styles.buttonText}>Continue</Text>
    </Pressable>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
  
      justifyContent: "center",
  
      // alignItems: "center",
    },
  
    header: {
      marginBottom: 20,
    },
    headerText: {
      fontSize: 26,
      fontWeight: "bold",
    },
    label: {
      fontSize: 16,
      color: "#666",
    },
    inputContainer: {
      width: "100%",
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: 18,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      padding: 10,
    },
    button: {
      backgroundColor: "#66d237",
      borderRadius: 10,
      padding: 10,
      alignItems: "center",
      width: "100%",
    },
    buttonText: {
      color: Colors.white,
      fontSize: 18,
    },
    
  });
  