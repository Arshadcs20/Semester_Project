import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import FormButton from "../components/shared/FormButton";
import FormInput from "../components/shared/FormInput";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import { signIn } from "../utils/auth";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnSubmit = () => {
    if (email != "" && password != "") {
      signIn(email, password);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: "#E6E6FA",
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
          color: "#1877F2",
          fontWeight: "800",
          marginVertical: 32,
          marginTop: 200,
        }}
      >
        Sign In
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
              <Ionicons name="eye-off-outline" size={30} color="navy" />
            ) : (
              <Ionicons name="eye-outline" size={30} color="navy" />
            )}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Submit button */}
      <FormButton
        labelText="Submit"
        handleOnPress={handleOnSubmit}
        style={{ width: "100%", fontWeight: "700" }}
      />
      {/* Footer */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <Text>Don't have an account?</Text>
        <Text
          style={{ marginLeft: 4, color: COLORS.primary }}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          Create account
        </Text>
      </View>
      <StatusBar style="auto" backgroundColor={"#039a83"} />
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
