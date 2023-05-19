import React from "react";
import { View, Text, TextInput } from "react-native";

const FormInput = ({
  labelText = "",
  placeholderText = "",
  onChangeText = null,
  value = null,
  ...more
}) => {
  return (
    <View style={{ width: "100%", marginBottom: 20 }}>
      <Text
        style={{
          margin: 0,
          fontWeight: "bold",
          color: "navy",
          fontSize: 17,
        }}
      >
        {labelText}
      </Text>
      <TextInput
        style={{
          padding: 10,
          borderColor: "#039a83",
          backgroundColor: "#039a83",
          width: "100%",
          fontSize: 18,
          borderRadius: 5,
          color: "white",
        }}
        placeholder={placeholderText}
        onChangeText={onChangeText}
        value={value}
        {...more}
      />
    </View>
  );
};

export default FormInput;
