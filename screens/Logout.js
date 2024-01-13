import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../store/auth-context";

export default function Logout() {
  const authContext = useContext(AuthContext);
useEffect(() => {
    authContext.logout();
}, [])

   
  return null;
}

const styles = StyleSheet.create({});
