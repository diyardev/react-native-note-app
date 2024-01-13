import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function AuthForm({ isLogin, onsubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredConfirmPassword, setEnteredCConfirmPassword] = useState("");

  const {
    email: emailisInvalid,
    name: nameisInvalid,
    phone: phoneisInvalid,
    password: passwordisInvalid,
  } = credentialsInvalid;

  function submitHandler() {
    onsubmit({
      email: enteredEmail,
      name: enteredName,
      phone: enteredPhone,
      password: enteredPassword,
    });
  }

  function updateInput(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "phone":
        setEnteredPhone(enteredValue);
        break;
      case "name":
        setEnteredName(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;

      default:
        break;
    }
  }

  return (
    <View>
      {!isLogin && (
        <Input
          label="İsim"
          type="default"
          onUpdateValue={updateInput.bind(this, "name")}
          value={enteredName}
          isInvalid={nameisInvalid}
        />
      )}
      {!isLogin && (
        <Input
          label="Telefon"
          type="phone-pad"
          onUpdateValue={updateInput.bind(this, "phone")}
          value={enteredPhone}
          isInvalid={phoneisInvalid}
        />
      )}
      <Input
        label="E-posta"
        type="email-address"
        onUpdateValue={updateInput.bind(this, "email")}
        value={enteredEmail}
        isInvalid={emailisInvalid}
      />
      <Input
        label="Şifre"
        secure
        onUpdateValue={updateInput.bind(this, "password")}
        value={enteredPassword}
        isInvalid={passwordisInvalid}
      />

      <View>
        <Button onPress={submitHandler}>
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
