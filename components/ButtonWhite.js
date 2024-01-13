import { StyleSheet, Text, View,Pressable } from "react-native";
import React from "react";

export default function ButtonWhite({ children,onPress }) {
  return (
    <Pressable
    onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    color: "black",
    padding: 10,
    fontWeight : 'bold',
    textAlign: "center",
  },
});
