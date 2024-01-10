import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//import { signOut } from "firebase/auth";
//import { auth } from '../config/Config';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40}}>Bienvenidos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE4E1",
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  }
})