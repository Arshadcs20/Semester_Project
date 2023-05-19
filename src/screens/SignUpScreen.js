import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import FormButton from "../components/shared/FormButton";
import { Ionicons } from "@expo/vector-icons";
import FormInput from "../components/shared/FormInput";
import { COLORS } from "../constants/theme";
import { signUp } from "../utils/auth";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnSubmit = () => {
    if (email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        //   SignUp
        signUp(email, password);
      } else {
        Alert.alert("password did not match");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "#E6E6FA",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
      }}
    >
      {/* Header */}
      <Text
        style={{
          fontSize: 33,
          color: "#1877F2",
          fontWeight: "800",
          marginVertical: 32,
          marginTop: 200,
        }}
      >
        Sign Up
      </Text>

      {/* Email */}
      <FormInput
        labelText="Email"
        placeholderText="Enter your email"
        onChangeText={(value) => setEmail(value)}
        value={email}
        keyboardType={"email-address"}
      />

      {/* Password */}
      <View style={{ flexDirection: "row", width: "100%" }}>
        <FormInput
          labelText="Password"
          placeholderText="Enter your password"
          onChangeText={(value) => setPassword(value)}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{
            // backgroundColor: "white",
            left: -33,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              // backgroundColor: "white",
              alignSelf: "center",
            }}
          >
            {showPassword ? (
              <Ionicons name="eye-off-outline" size={30} color="black" />
            ) : (
              <Ionicons name="eye-outline" size={30} color="black" />
            )}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <FormInput
          labelText="Confirm Password"
          placeholderText="Enter your password again"
          onChangeText={(value) => setConfirmPassword(value)}
          value={confirmPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{
            // backgroundColor: "white",
            left: -33,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              // backgroundColor: "white",
              alignSelf: "center",
            }}
          >
            {showPassword ? (
              <Ionicons name="eye-off-outline" size={30} color="black" />
            ) : (
              <Ionicons name="eye-outline" size={30} color="black" />
            )}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}

      {/* Submit button */}
      <FormButton
        labelText="Sign up"
        handleOnPress={handleOnSubmit}
        style={{ width: "100%" }}
      />

      {/* Footer */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <Text>Already have an account?</Text>
        <Text
          style={{ marginLeft: 4, color: COLORS.primary }}
          onPress={() => navigation.navigate("SignInScreen")}
        >
          Sign in
        </Text>
      </View>
      <StatusBar style="auto" backgroundColor={"#039a83"} />
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
