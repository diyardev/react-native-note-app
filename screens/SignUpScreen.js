import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useContext, useState } from "react";
import AuthContent from "../components/AuthContent";
import { createUser } from "../util/auth";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [isAuthanticating, setIsAuthanticating] = useState(false);
  const authContext = useContext(AuthContext);

  async function signUpHandler({ email, password,name,phone }) {
    setIsAuthanticating(true);
    const userData = await createUser(email, password,name,phone);
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
    setIsAuthanticating(false);
  }

  if (isAuthanticating) {
    return <Loading message="Kullanıcı oluşturuluyor..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

const styles = StyleSheet.create({});
