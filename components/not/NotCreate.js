import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import HeaderNavbar from "../HeaderNavbar";
import { Ionicons, Feather } from "@expo/vector-icons";
import { storeNote } from "../../util/requests";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../store/auth-context";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";

export default function NotCreate() {
  const authContext = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigation = useNavigation();

  async function saveHandler() {
    const userId = authContext.authUser.id;
    const response = await storeNote({ title, content, userId });
    if (!title.length || !content.length) {
      return showMessage({
        message: "Dikkat!",
        description: "Lütfen zorunlu * alanları doldurunuz..",
        type: "danger",
        autoHide: 5000,
      });
    }
    setTitle("");
    setContent("");
    showMessage({
      message: response.status == "danger" ? "Hata!" : "Başarılı!",
      description: response.message,
      type: response.status,
      autoHide: 5000,
    });

      navigation.goBack();
  }

  const HeaderNavbarRightContent = (
    <TouchableOpacity onPress={saveHandler}>
      <Feather name="save" size={28} color="white" />
    </TouchableOpacity>
  );

  return (
    <View>
      <HeaderNavbar
        title="Not Oluştur"
        rightContent={HeaderNavbarRightContent}
      />
      <View style={[styles.container]}>
        <FlashMessage position="top" />
        <View>
          <Text style={[styles.label]}>
            Not Başlığı
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
              *
            </Text>
          </Text>
          <TextInput
            onChangeText={(title) => setTitle(title)}
            placeholder="Lütfen not başlığını giriniz"
            style={[styles.input]}
            value={title}
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={[styles.label]}>
            Not İçeriği
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
              *
            </Text>
          </Text>
          <TextInput
            onChangeText={(content) => setContent(content)}
            placeholder="Lütfen içeriğini başlığını giriniz"
            style={[styles.input, { height: 500, textAlignVertical: "top" }]}
            autoCapitalize="none"
            value={content}
            multiline={true}
            numberOfLines={10}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "500",
  },
  labelInvalid: {
    color: "red",
  },
  input: {
    backgroundColor: "#F6F8FA",
    fontSize: 16,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    borderBottomWidth: 4,
  },
  inputInvalid: {
    backgroundColor: "#fde8e8",
  },
});
