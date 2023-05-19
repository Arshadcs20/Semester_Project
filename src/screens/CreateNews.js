import React, { useState } from "react";
import { Text, SafeAreaView, Alert, StatusBar } from "react-native";
import { COLORS } from "../constants/theme";
import FormInput from "../components/shared/FormInput";
import FormButton from "../components/shared/FormButton";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const CreateQuizScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleNewSave = async () => {
    const currentNewsId = Math.floor(100000 + Math.random() * 9000).toString();
    setDoc(doc(db, "News", currentNewsId), {
      title: title,
      content: content,
    })
      .then(() => {
        Alert.alert("Success!", "News saved successfully.");
      })
      .catch((error) => {
        Alert.alert("Error!", "Some Error found.");
      });

    setTitle("");
    setContent("");
    Alert.alert("Success!", "News saved successfully.");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          marginVertical: 20,
          fontWeight: "bold",
          color: COLORS.black,
        }}
      >
        Create News
      </Text>

      <FormInput
        labelText="Title"
        placeholderText="Enter news title"
        onChangeText={(val) => setTitle(val)}
        value={title}
      />
      <FormInput
        labelText="Content"
        placeholderText="Enter news contents"
        onChangeText={(val) => setContent(val)}
        value={content}
      />

      <FormButton labelText="Save News" handleOnPress={handleNewSave} />
      <StatusBar style="auto" backgroundColor={"#039a83"} />
    </SafeAreaView>
  );
};

export default CreateQuizScreen;
