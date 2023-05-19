import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";

export const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      Alert.alert("Logged in", "You have succesfully logged in.");
    })
    .catch((err) => {
      Alert.alert("Error", "Can't logged in.");
    });
};

export const signUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      Alert.alert("Signed up", "Successfully");
    })
    .catch((err) => {
      Alert.alert("Error!", "can't sign up!.");
    });
};

export const signOut = () => {
  auth.signOut().then(() => {
    Alert.alert("Signed Out", "Successfully SignOut");
  });
};
