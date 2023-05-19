import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import FormButton from "../components/shared/FormButton";
import { COLORS } from "../constants/theme";
import { FontAwesome } from "@expo/vector-icons";
const HomeScreen = ({ navigation }) => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showActivityIndicator, setShowActivityIndicator] = useState(true);

  const getAllQuizzes = async () => {
    setRefreshing(true);
    getDocs(collection(db, "Quizzes"))
      .then((querySnapshot) => {
        let quizzes = [];
        querySnapshot.forEach((doc) => {
          quizzes.push({ ...doc.data(), id: doc.id });
          setAllQuizzes(quizzes);
        });
      })
      .catch(() => {
        Alert.alert("Error", "Some Issues in the Backend.");
      });
    setRefreshing(false);
  };

  const handleDelete = async (quizId) => {
    try {
      await deleteDoc(doc(db, "Quizzes", quizId));
      Alert.alert("Test Deleted Successfully");
    } catch (error) {
      Alert.alert("Error!", "Some Error occur.");
    }
  };

  useEffect(() => {
    getAllQuizzes();
  }, [refreshing]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowActivityIndicator(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "lavender",
        position: "relative",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: COLORS.white,
          backgroundColor: "#039a83",
          // opacity: 0.5,
          elevation: 4,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: "white",
            fontWeight: "bold",
            padding: 12,
            alignSelf: "center",
          }}
        >
          Online Testing System
        </Text>
      </View>
      {showActivityIndicator ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={allQuizzes}
          onRefresh={getAllQuizzes}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          style={{
            paddingVertical: 16,
          }}
          renderItem={({ item: quiz }) => (
            <View
              style={{
                padding: 8,
                borderRadius: 15,
                marginVertical: 5,
                marginHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: COLORS.white,
                elevation: 2,
                color: "red",
                elevation: 5,
              }}
            >
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text
                  style={{ fontSize: 18, color: "purple", fontWeight: "500" }}
                >
                  {quiz.title}
                </Text>
                {quiz.description != "" ? (
                  <Text style={{ opacity: 0.7, color: "black" }}>
                    {quiz.description}
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 50,
                  marginRight: 13,
                  // backgroundColor: COLORS.primary + "20",
                  backgroundColor: "#E6E6FA",
                  elevation: 15,
                }}
                onPress={() => handleDelete(quiz.id)}
              >
                <Text style={{ color: COLORS.primary }}>
                  <MaterialIcons name="delete" size={25} color="red" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 50,

                  // backgroundColor: COLORS.primary + "20",
                  backgroundColor: "#039a83",
                  elevation: 15,
                }}
                onPress={() => {
                  navigation.navigate("PlayQuizScreen", {
                    quizId: quiz.id,
                  });
                }}
              >
                <Text style={[{ color: COLORS.primary, marginLeft: 7 }]}>
                  <FontAwesome name="play" size={25} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      {/* Button */}
      <FormButton
        labelText="Create a New Test"
        style={{
          position: "absolute",
          alignSelf: "center",
          bottom: 6,
          right: 11,
          borderRadius: 50,
          paddingHorizontal: 30,
        }}
        handleOnPress={() => navigation.navigate("CreateQuizScreen")}
      />
      <StatusBar style="auto" backgroundColor={"#039a83"} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
export default HomeScreen;
