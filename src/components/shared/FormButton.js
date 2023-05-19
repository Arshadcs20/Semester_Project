import React from "react";
import { Text, TouchableOpacity } from "react-native";

const FormButton = ({
  labelText = "",
  handleOnPress = null,
  style,
  isPrimary = true,
  ...more
}) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        backgroundColor: "#039a83",
        borderWidth: 1,
        borderColor: "#039a83",
        borderRadius: 5,
        ...style,
      }}
      activeOpacity={0.9}
      onPress={handleOnPress}
      {...more}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
          color: "white",
        }}
      >
        {labelText}
      </Text>
    </TouchableOpacity>
  );
};

export default FormButton;
