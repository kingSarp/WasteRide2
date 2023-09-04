import { View, Text, StyleSheet ,  Pressable, TextInput } from 'react-native'
import React from 'react'

export default function DetailsScreen({ navigation}) {
  return (
    <View style={styles.container}>
    <View>
      <Text style={styles.label}>First Name</Text>
      <TextInput style={styles.input} placeholder="Enter Name" />
    </View>
    <View>
      <Text style={styles.label}>Last Name</Text>
      <TextInput style={styles.input} placeholder="Enter Name" />
    </View>
    <View>
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Enter Name" />
    </View>

    <Pressable
      style={styles.button1}
      onPress={() => navigation.navigate("Password")}
    >
      <Text>Next</Text>
    </Pressable>
  </View>
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
  