import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import React from "react";

export default function Loading({ message }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="xlarge" color="#ffffff" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor : 'black',
  },
  text : {
    fontWeight : 'bold',
    fontSize : 20,
    color :'white',
    marginTop : 20
  }
});
