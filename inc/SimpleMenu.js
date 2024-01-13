import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

export default function SimpleMenu() {
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.button}>
        <Entypo
          style={styles.icon}
          name="dots-three-vertical"
          size={24}
          color="white"
        />
      </TouchableOpacity>
      <View style={styles.list}>
        <TouchableOpacity style={styles.listItem}>
          <Entypo
            style={styles.icon}
            name="dots-three-vertical"
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <Entypo
            style={styles.icon}
            name="dots-three-vertical"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    bottom: 30,
    right: 35,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 25,
  },
});
