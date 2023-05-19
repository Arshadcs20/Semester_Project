import React, { useState } from "react";
import { StatusBar, Text, SafeAreaView, Alert } from "react-native";
import { COLORS } from "../constants/theme";
import FormInput from "../components/shared/FormInput";
import FormButton from "../components/shared/FormButton";
import { createQuiz } from "../utils/database";

const CreateQuizScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleQuizSave = async () => {
    const currentQuizId = Math.floor(100000 + Math.random() * 9000).toString();
    await createQuiz(currentQuizId, title, description);
    navigation.navigate("AddQuestionScreen", {
      currentQuizId: currentQuizId,
      currentQuisTitle: title,
    });

    setTitle("");
    setDescription("");
    Alert.alert("Success!", "Test saved successfully.");
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
        Create Test
      </Text>

      <FormInput
        labelText="Title"
        placeholderText="Enter test title"
        onChangeText={(val) => setTitle(val)}
        value={title}
      />
      <FormInput
        labelText="Description"
        placeholderText="Enter test description"
        onChangeText={(val) => setDescription(val)}
        value={description}
      />

      <FormButton labelText="Save Test" handleOnPress={handleQuizSave} />
      <StatusBar style="auto" backgroundColor={"#039a83"} />
    </SafeAreaView>
  );
};

export default CreateQuizScreen;
