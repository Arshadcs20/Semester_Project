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
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import FormButton from "../components/shared/FormButton";
import { COLORS } from "../constants/theme";

const NewScreen = ({ navigation }) => {
  const [allNews, setAllNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showActivityIndicator, setShowActivityIndicator] = useState(true);

  const getAllNews = async () => {
    setRefreshing(true);
    getDocs(collection(db, "News"))
      .then((querySnapshot) => {
        let news = [];
        querySnapshot.forEach((doc) => {
          news.push({ ...doc.data(), id: doc.id });
          setAllNews(news);
        });
      })
      .catch(() => {
        Alert.alert("Error!", "Some error occured.");
      });
    setRefreshing(false);
  };

  const handleDelete = async (quizId) => {
    try {
      await deleteDoc(doc(db, "News", quizId));
      Alert.alert("News Deleted Successfully");
    } catch (error) {
      Alert.alert("Error!", "Some error occured.");
    }
  };

  useEffect(() => {
    getAllNews();
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
          Important News!
        </Text>
      </View>

      {/* Quiz list */}
      {showActivityIndicator ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={allNews}
          onRefresh={getAllNews}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          style={{
            paddingVertical: 16,
          }}
          renderItem={({ item: news }) => (
            <View
              style={{
                padding: 8,
                borderRadius: 15,
                marginVertical: 5,
                marginHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                // backgroundColor: COLORS.white,
                backgroundColor: "white",
                elevation: 2,
                color: "red",
                elevation: 5,
              }}
            >
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "purple",
                  }}
                >
                  {news.title}
                </Text>
                {news.important != "" ? (
                  <Text style={{ opacity: 0.4 }}>{news.content}</Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 50,
                  marginRight: 13,
                  // backgroundColor: COLORS.primary + "20",
                  backgroundColor: "white",
                  elevation: 15,
                }}
                onPress={() => handleDelete(news.id)}
              >
                <Text style={{ color: COLORS.primary }}>
                  <MaterialIcons name="delete" size={25} color="red" />
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* Button */}
      <FormButton
        labelText="Make News"
        // labelText="Create a New Test"
        style={{
          position: "absolute",
          bottom: 6,
          right: 11,
          borderRadius: 50,
          paddingHorizontal: 30,
        }}
        handleOnPress={() => navigation.navigate("CreateNews")}
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
export default NewScreen;
