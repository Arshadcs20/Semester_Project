import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.text}>
        Hi, Muhammad Arshad here. I'm currently pursuing a Bachelor's degree in
        Computer Science, in my sixth semester at Bahauddin Zakriya University
        Multan, Pakistan.{"\n\t"}
        {"\n "}
        Along with my teammate Aqil, I'm working on an Online Testing System App
        for our semester project.
      </Text>
      <Text style={styles.footer}>Copyright © reserved by Team Badri-313.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lavender",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "justify",
    lineHeight: 24,
  },
  footer: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 120,
    bottom: -50,
  },
});

export default AboutScreen;
