import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import AuthContent from "../components/AuthContent";
import { getUser, createUser, login, authenticate } from "../util/auth";
import Loading from "../components/Loading";
import { AuthContext } from "../store/auth-context";
import * as firebase from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "992466223245-2jwe827868shsdh222d.apps.googleusercontent.com",
});

export default function LoginScreen() {
  const [isAuthanticating, setIsAuthanticating] = useState(false);
  const authContext = useContext(AuthContext);

  async function googleSignIn() {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    user = userInfo.user;
    const getUserData = await getUser(user.email);
    if (getUserData != 0) {
      // Kullanıcı var ise
      idToken = getUserData.id;
      userSetData = getUserData;
    } else {
      user = await createUser(
        userInfo.user.email,
        new Date().getTime(),
        userInfo.user.name,
        null,
        userInfo.user.photo
      );

      idToken = user.user.id;
      userSetData = user.user;
    }

    await AsyncStorage.setItem("googleSignActive", "1");
    await authContext.authenticate(idToken, userSetData);
  }

  async function loginHandler({ email, password }) {
    setIsAuthanticating(true);
    const userData = await login(email, password);
    if (userData.user && userData.user.id) {
      await authContext.authenticate(userData.user.id,userData.user);
    } else {
      setIsAuthanticating(false);
      showMessage({
        message: userData.msg,
        type: userData.status,
        autoHide: 5000,
      });
    }
  }

  if (isAuthanticating) {
    return <Loading message="Kullanıcı giriş yapıyor..." />;
  }
  return (
    <View>
      <FlashMessage position="top" />
      <AuthContent isLogin onAuthenticate={loginHandler} />
      <GoogleSigninButton
        style={styles.googlebtn}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  googlebtn: {
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4285F4",
    borderRadius: 5,
    padding: 10,
  },
});
