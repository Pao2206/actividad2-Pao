import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/Config";

/////
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true);

export default function RecursosScreen() {
  const [imagen, setImagen] = useState(" ");

  //////CARGAR UNA IMAGEN DESDE LA GALERIA
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  ////SUBIR UNA IMAGEN A FIREBASE STORAGE
  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, "usuarios/" + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: "image/jpg",
      });

      console.log("La imagen se subió con éxito");

      Alert.alert("Mensaje", "Se subio la imagen con exito");

      // Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log("URL de desacarga de la imagen", imageURL);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15, fontStyle: 'italic' }}>Subir imagen desde la galeria</Text>
      <TouchableOpacity
        onPress={() => pickImage()}
        style={{
          width: 190,
          height: 45,
          backgroundColor: "#6495ED",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          margin: 20,
          borderWidth: 4,
          borderColor: "#4169E1",
        }}
      >
        <Text style={{ fontSize: 18 }}>Seleccionar imagen</Text>
      </TouchableOpacity>
      <Image source={{ uri: imagen }} style={styles.img} />

      <TouchableOpacity
        onPress={() => subirImagen("avatar1")}
        style={{
          width: 135,
          height: 45,
          backgroundColor: "#98FB98",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          margin: 25,
          borderWidth: 4,
          borderColor: "#90EE90",
          
        }}
      >
        <Text style={{ fontSize: 18 }}>Subir imagen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    borderRadius: 70,
  },
  container: {
    backgroundColor: "#F0FFFF",
    flex: 1,
    alignItems: "center",
    justifyContent: 'space-evenly'
  },
});
