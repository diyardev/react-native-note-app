import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { storeNote } from "../util/requests";


export default function HeaderNavbar({ title, rightContent, hideBackButton }) {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <View style={styles.left}>
        {!hideBackButton && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={styles.backIcon}
              name="ios-arrow-back"
              size={28}
              color="white"
            />
          </TouchableOpacity>
        )}

        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.right}>{rightContent}</View>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  backIcon: {
    marginRight: 10,
  },
  left: {
    flexDirection: "row",
  },
});
