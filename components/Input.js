import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function Input({
  label,
  type,
  onUpdateValue,
  value,
  secure,
  isInvalid,
}) {

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label,isInvalid && styles.labelInvalid]}>{label}</Text>
      <TextInput
        style={[styles.input,isInvalid && styles.inputInvalid]}
        secureTextEntry={secure}
        value={value}
        autoCapitalize="none"
        onChangeText={onUpdateValue}
        keyboardType={type}
        placeholder={label}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {},
  label: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "500",
  },
  labelInvalid: {
    color:'red'
  },
  input: {
    backgroundColor: "#F6F8FA",
    fontSize: 16,
    padding: 10,
    marginTop: 10,
    borderRadius : 5
  },
  inputInvalid: {
    backgroundColor: "#fde8e8",
  },
});
