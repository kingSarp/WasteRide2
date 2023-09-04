import { View, Text,  StyleSheet,   Pressable,} from 'react-native'
import React from 'react';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { OtpInput } from "react-native-otp-entry";

export default function OtpScreen({navigation}) {
  return (
    <View style={styles.container}>
    <Text style={styles.message}>
      Enter the 5-digit code that has been sent to 0271383110
    </Text>

    {/* //  used a library for otp */}
    <View style={styles.otpcontainer}>
      <OtpInput
        numberOfDigits={5}
        focusColor="green"
        onTextChange={(text) => console.log(text)}
        keyboardType="number-pad"

        // style={styles. inputsContainer}
      />
    </View>
    <View style={styles.resendContainer}>
      <Text style={styles.resendText}>
        Haven’t gotten the code yet? Resend Code
      </Text>
    </View>
    <View style={styles.nextContainer}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Details")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  </View>
  )
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
  });
  