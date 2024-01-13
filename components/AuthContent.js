import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthForm from "./AuthForm";
import ButtonWhite from "./ButtonWhite";
import { useNavigation } from "@react-navigation/native";

export default function AuthContent({ isLogin, onAuthenticate }) {
  
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    name: false,
    phone: false,
  });

  const navigation = useNavigation();
  function switchScreen() {
    if (isLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.goBack();
    }
  }

  function submitHandler(credentials) {
    let { name, phone, email, password } = credentials;

    email = email.trim();
    password = password.trim();
    name = name.trim();
    phone = phone.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length >= 6;
    const nameIsValid = name.length > 2;
    const phoneIsValid = phone.length > 2;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!nameIsValid || !phoneIsValid))
    ) {
      Alert.alert("Hoops!", "Lütfen girdiğiniz değerleri kontrol ediniz..");
      setCredentialsInvalid({
        email: !emailIsValid,
        name: !nameIsValid,
        phone: !phoneIsValid,
        password: !passwordIsValid,
      });
      return;
    }

    onAuthenticate({ name, phone, email, password });
  }

  return (
    <View style={styles.container}>
      <AuthForm
        credentialsInvalid={credentialsInvalid}
        isLogin={isLogin}
        onsubmit={submitHandler}
      />
      <View>
        <ButtonWhite onPress={switchScreen}>
          {isLogin ? "Yeni kullanıcı oluştur" : "Giriş Yap"}
        </ButtonWhite>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex : 1,
    // justifyContent : 'center',
    // alignItems:'flex-start',
    padding: 30,
  },
});
