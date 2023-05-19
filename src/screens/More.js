import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <View style={styles.card}>
      <MaterialIcons name={icon} size={48} color="#fff" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const FeaturesScreen = () => {
  return (
    <View style={styles.container}>
      <FeatureCard
        icon="people"
        title="Collaborate"
        description="Collaborate with your friends in real-time."
      />
      <FeatureCard
        icon="folder"
        title="Organize"
        description="Organize your files and notes, books with ease."
      />
      <FeatureCard
        icon="security"
        title="Secure"
        description="Keep your data safe and secure with advanced security features."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lavender",
  },
  card: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
});

export default FeaturesScreen;
