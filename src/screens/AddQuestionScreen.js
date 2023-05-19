import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { COLORS } from "../constants/theme";
import FormInput from "../components/shared/FormInput";
import FormButton from "../components/shared/FormButton";
import { createQuestion } from "../utils/database";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const AddQuestionScreen = ({ navigation, route }) => {
  const [currentQuizId, setCurrentQuizId] = useState(
    route.params.currentQuizId
  );
  const [currentQuizTitle, setCurrentQuizTitle] = useState(
    route.params.currentQuizTitle
  );

  const [question, setQuestion] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionThree, setOptionThree] = useState("");
  const [optionFour, setOptionFour] = useState("");

  const handleQuestionSave = async () => {
    if (
      question == "" ||
      correctAnswer == "" ||
      optionTwo == "" ||
      optionThree == "" ||
      optionFour == ""
    ) {
      return;
    }

    let currentQuestionId = Math.floor(
      100000 + Math.random() * 9000
    ).toString();

    // Upload Image
    let imageUrl = "";
    if (imageUri != "") {
      const metadata = {
        contentType: "image/jpeg",
      };
      const imageBlob = await fetch(imageUri).then((response) =>
        response.blob()
      );

      const storageRef = ref(
        storage,
        `/images/questions/${currentQuizId}_${currentQuestionId}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageBlob, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        async () => {
          imageUrl = await getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL) => {
              return downloadURL;
            }
          );

          // Add question to db
          try {
            createQuestion(currentQuizId, currentQuestionId, {
              question: question,
              correct_answer: correctAnswer,
              incorrect_answers: [optionTwo, optionThree, optionFour],
              imageUrl: imageUrl,
            });
            Alert.alert("Success!", "Question Added successfully.");

            // Reset
            setQuestion("");
            setCorrectAnswer("");
            setOptionTwo("");
            setOptionThree("");
            setOptionFour("");
            setImageUri("");
          } catch (error) {
            Alert.alert("Error", "Failed to add question.");
          }
        }
      );
    } else {
      // Add question to db without image
      try {
        await createQuestion(currentQuizId, currentQuestionId, {
          question: question,
          correct_answer: correctAnswer,
          incorrect_answers: [optionTwo, optionThree, optionFour],
          imageUrl: "",
        });
        Alert.alert("Success!", "Question Added successfully.");

        // Reset
        setQuestion("");
        setCorrectAnswer("");
        setOptionTwo("");
        setOptionThree("");
        setOptionFour("");
        setImageUri("");
      } catch (error) {
        Alert.alert("Error", "Failed to add question.");
      }
    }
  };

  const selectImage = async () => {
    const imagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
      exif: true,
    };
    const result = await ImagePicker.launchImageLibraryAsync(
      imagePickerOptions
    );
    if (!result.canceled) {
      setImageUri(result.uri); // access selected assets through the "assets" array instead
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        <View style={{ padding: 20 }}>
          <Text
            style={{ fontSize: 20, textAlign: "center", color: COLORS.black }}
          >
            Add Question
          </Text>
          <Text style={{ textAlign: "center", marginBottom: 20 }}>
            For {currentQuizTitle}
          </Text>

          <FormInput
            labelText="Question"
            placeholderText="Enter question"
            onChangeText={(val) => setQuestion(val)}
            value={question}
          />

          {/* Image upload */}

          {imageUri === "" ? (
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 28,
                borderWidth: 1,
                borderColor: "green",
                borderRadius: 3,
                backgroundColor: "white",
              }}
              onPress={() => selectImage()}
            >
              <Text style={{ opacity: 0.5, color: COLORS.primary }}>
                + Add Image here
              </Text>
            </TouchableOpacity>
          ) : (
            <Image
              source={{
                uri: imageUri,
              }}
              resizeMode={"cover"}
              style={{
                width: "100%",
                height: 190,
                borderRadius: 5,
              }}
            />
          )}

          {/* Options */}
          <View style={{ marginTop: 30 }}>
            <FormInput
              labelText="Correct Answer"
              onChangeText={(val) => setCorrectAnswer(val)}
              value={correctAnswer}
            />
            <FormInput
              labelText="Option 2"
              onChangeText={(val) => setOptionTwo(val)}
              value={optionTwo}
            />
            <FormInput
              labelText="Option 3"
              onChangeText={(val) => setOptionThree(val)}
              value={optionThree}
            />
            <FormInput
              labelText="Option 4"
              onChangeText={(val) => setOptionFour(val)}
              value={optionFour}
            />
          </View>
          <View>
            <FormButton
              labelText="Save Question"
              handleOnPress={handleQuestionSave}
            />
          </View>
          <FormButton
            labelText="Go to Home"
            isPrimary={false}
            handleOnPress={() => {
              setCurrentQuizId("");
              navigation.navigate("TabView");
            }}
            style={{
              marginVertical: 20,
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddQuestionScreen;
