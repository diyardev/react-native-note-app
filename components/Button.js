import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React from "react";

export default function Button({ children,onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    marginTop: 20,
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    color: "white",
    padding: 10,
    fontWeight : 'bold',
    textAlign: "center",
  },
});
