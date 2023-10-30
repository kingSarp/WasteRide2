import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function LogOut(props) {
    const logout = () =>{
  // Implement your logout logic here
      // For example, clear user session, navigate to the login screen, etc.
      console.log('Logout');
  
      // You can add your logout logic here, such as clearing user data, navigating, etc.
    }

  return (
    <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
    <View style={styles.logoutButtonContainer}>
      <Button title="Logout" onPress={logout} />
    </View>
  </DrawerContentScrollView>
  )
}
const styles = StyleSheet.create({
    logoutButtonContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
  });

