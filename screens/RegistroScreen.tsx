import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";

export default function RegistroScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //console.log("Registro correcto")
        navigation.navigate("Login");
        setCorreo('');
        setContrasenia('');

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)

        switch (errorCode) {
          case "auth/weak-password":
            Alert.alert("ERROR", "La contraseña de tener minimo 6 caracteres)");
            setContrasenia("");
            break;
          case "auth/invalid-email":
            Alert.alert("ERROR", "Correo no permitido");
            setCorreo("");
            break;
          case "auth/missing-password":
            Alert.alert("ERROR", "Escriba una contraseña");
            break;
          case "auth/missing-email":
            Alert.alert("ERROR", "Escriba un correo");
            break;
            case "auth/email-already-in-use":
            Alert.alert("ERROR", "Correo ya registrado");
            break;
          default:
            Alert.alert("ERROR");
            break;
        }
        setCorreo('');
        setContrasenia('');
      });
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontStyle:'italic' }}>
        Introduce tus datos para crear una cuenta
      </Text>
      <TextInput
        style={styles.input}
        placeholder=" Ingrese email"
        keyboardType="email-address"
        onChangeText={(texto) => setCorreo(texto)}
        value={correo}        
      />
      <TextInput
        style={styles.input}
        placeholder=" Ingresar contraseña"
        onChangeText={(texto) => setContrasenia(texto)}
        value={contrasenia}        
      />

      <TouchableOpacity
        onPress={() => registro()}
        style={{
          width: 200,
          height: 40,
          backgroundColor: "#FF69B4",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          margin: 10
        }}
      >
        <Text style={{ fontSize: 18 }}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF0F5",
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  },
  input: {
    backgroundColor: "white",
    height: 40,
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: 8,
    margin:10,
    borderColor: '#FF1493',
    borderWidth: 2
  },
});
