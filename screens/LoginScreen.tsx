import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("Drawer_Welcome");
        setCorreo('');
        setContrasenia('');

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)

        switch (errorCode) {
          case "auth/invalid-email":
            Alert.alert("ERROR", "Credenciales incorrectas");
            break;
          case "auth/invalid-credential":
            Alert.alert("ERROR", "Credenciales incorrectas");
            break;
          case "auth/missing-password":
            Alert.alert("ERROR", "Ingrese la contraseña");
            break;
          case "auth/wrong-password":
            Alert.alert("ERROR", "Contraseña incorrecta");
            break;
          case "auth/user-not-found":
            Alert.alert(
              "ERROR",
              "Usuario no encontrado, por favor, registrate!"
            );
            break;
          case "auth/too-many-requests":
            Alert.alert(
              "ERROR",
              "Tu cuenta ha sido temporalmente desactivada debido a los varios intentos fallidos de inicio de sesión, vuelve a intentarlo más tarde."
            );
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
      <Text style={{ fontSize: 35, textAlign: "center" }}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder=" Ingresar email"
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
        onPress={() => login()}
        style={{
          width: 200,
          height: 45,
          backgroundColor: "#9370DB",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
        }}
      >
        <Text style={{ fontSize: 18 }}>Ingresar</Text>
      </TouchableOpacity>
      <Text
        onPress={() => navigation.navigate("Registro")}
        style={{ fontSize: 15 }}
      >
        {" "}
        👉 Regístrate aquí 👈
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6E6FA",
    flex: 10,
    alignItems: "center",
    justifyContent: 'center'
  },
  input: {
    backgroundColor: "white",
    height: 40,
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: 8,
    margin: 10,
    borderColor: "#663399",
    borderWidth: 2,
  },
});
