import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB67vOvTWJ5WAqxBWd8zYcwOLHu_h58gaY",
  authDomain: "app-mov2-api-41b79.firebaseapp.com",
  databaseURL: "https://app-mov2-api-41b79-default-rtdb.firebaseio.com",
  projectId: "app-mov2-api-41b79",
  storageBucket: "app-mov2-api-41b79.appspot.com",
  messagingSenderId: "1092083745694",
  appId: "1:1092083745694:web:33d702419f59c367664c8f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export const auth = getAuth(app)
export const db = getDatabase(app);
export const storage = getStorage(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
