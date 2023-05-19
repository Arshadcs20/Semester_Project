import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AddQuestionScreen,
  CreateQuizScreen,
  PlayQuizScreen,
} from "../screens";
import TabViewMain from "../screens/TabView.js";
import CreateNewScreen from "../screens/CreateNews";

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabView" component={TabViewMain} />
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
      <Stack.Screen name="CreateQuizScreen" component={CreateQuizScreen} />
      <Stack.Screen name="AddQuestionScreen" component={AddQuestionScreen} />

      <Stack.Screen name="PlayQuizScreen" component={PlayQuizScreen} />
      <Stack.Screen name="CreateNews" component={CreateNewScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
