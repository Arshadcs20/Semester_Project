import { Alert } from "react-native";
import { db } from "../../firebase";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
//creating quiz having title and description
export const createQuiz = (currentQuizId, title, description) => {
  setDoc(doc(db, "Quizzes", currentQuizId), {
    title: title,
    description: description,
  })
    .then(() => {
      // Data saved successfully!
      Alert.alert("Success!", "Data submitted");
    })
    .catch((error) => {
      // The write failed...
      Alert.alert("Error!", "Some error occurred.");
    });
};
//Adding question in current exam/quiz
export const createQuestion = (currentQuizId, currentQuestionId, question) => {
  setDoc(doc(db, "Quizzes", currentQuizId, "QNA", currentQuestionId), question)
    .then(() => {
      // Data saved successfully!
      Alert.alert("Success!", "question submitted");
    })
    .catch((error) => {
      // The write failed...
      Alert.alert("Error!", "Some error occurred.");
    });
};
//getting all quizzes from firebase...
export const getQuizzes = () => {
  getDocs(collection(db, "Quizzes"))
    .then((querySnapshot) => {
      let quizzes = [];
      querySnapshot.forEach((doc) => {
        quizzes.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((error) => {
      Alert.alert("Error!", "Some error occurred.");
    });
};

export const getQuizById = async (currentQuizId) => {
  try {
    const quizDoc = await getDoc(doc(db, "Quizzes", currentQuizId));
    if (quizDoc.exists()) {
      return { ...quizDoc.data(), id: quizDoc.id };
    } else {
      Alert.alert("Error!", "No such document!.");
      return null;
    }
  } catch (error) {
    Alert.alert("Error!", "No such document!.");
    return null;
  }
};

export const getQuestionsByQuizId = async (currentQuizId) => {
  return getDocs(collection(db, "Quizzes", currentQuizId, "QNA"))
    .then((querySnapshot) => {
      let questions = [];
      querySnapshot.forEach((doc) => {
        questions.push({ ...doc.data(), id: doc.id });
      });

      return questions;
    })
    .catch(() => {
      Alert.alert("Error!", "No such document!.");
      return null;
    });
};
