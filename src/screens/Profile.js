import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FormButton from "../components/shared/FormButton";
import { COLORS } from "../constants/theme";
import { auth } from "../../firebase";
import { signOut } from "../utils/auth";

const SignInScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "lavender",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
      }}
    >
      {/* Header */}
      <Text
        style={{
          fontSize: 33,
          color: COLORS.black,
          fontWeight: "800",
          marginVertical: 32,
          marginTop: 200,
        }}
      >
        Welcome
      </Text>
      <Image
        style={{ width: 100, height: 100, resizeMode: "contain" }}
        source={require("../../assets/profile2.png")}
      />
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 22 }}
      >
        <Text style={{ fontSize: 18 }}>
          {auth.currentUser?.email || "DEFAULT"}
        </Text>
      </View>
      {/* Submit button */}
      <FormButton
        labelText={
          <Text
            style={{
              fontSize: 20,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              // color: COLORS.error,
            }}
            onPress={signOut}
          >
            SignOut {"\t"}
            <MaterialCommunityIcons name="logout" size={25} color="red" />
          </Text>
        }
        handleOnPress={signOut}
        style={{ width: "100%", fontWeight: "700" }}
      />

      <StatusBar style="auto" backgroundColor={"#039a83"} />
    </SafeAreaView>
  );
};

export default SignInScreen;
