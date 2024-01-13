import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import HeaderNavbar from "../HeaderNavbar";
import { Ionicons, Feather } from "@expo/vector-icons";
import { storeNote, updateNote } from "../../util/requests";
import { useNavigation } from "@react-navigation/native";
import database from "@react-native-firebase/database";
import { AuthContext } from "../../store/auth-context";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";
import { formatCreateTimestamp, formatUpdateTimestamp } from "../../util/funcs";

export default function ShowNot({ route }) {
  const notData = route.params.notData || false;

  const [title, setTitle] = useState(notData.title);
  const [content, setContent] = useState(notData.content);
  const navigation = useNavigation();

  async function saveHandler() {
    if (!title.length || !content.length) {
      return showMessage({
        message: "Dikkat!",
        description: "Lütfen zorunlu * alanları doldurunuz..",
        type: "danger",
        autoHide: 5000,
      });
    }

    const id = notData.id;
    const response = await updateNote({ id, title, content });
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
        title="Not Güncelle"
        rightContent={HeaderNavbarRightContent}
      />
        <View style={{ flexDirection : 'row', justifyContent  : 'space-between',
      paddingHorizontal : 20,marginTop : 10 }}>
        <Text style={styles.listItemUpdateTime}>
            {formatCreateTimestamp(notData.dateTime)}
          </Text>
          <Text style={styles.listItemUpdateTime}>
            {formatUpdateTimestamp(notData.updated_date)}
          </Text>
        </View>
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
            value={title}
            onChangeText={(title) => setTitle(title)}
            placeholder="Lütfen not başlığını giriniz"
            style={[styles.input]}
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
          <ScrollView>
          <TextInput
            value={content}
            onChangeText={(content) => setContent(content)}
            placeholder="Lütfen içeriğini başlığını giriniz"
            style={[styles.input, { height: 400, textAlignVertical: "top" }]}
            autoCapitalize="none"
            multiline={true}
            numberOfLines={10}
          />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  listItemUpdateTime: {
    fontSize: 13,
    color: "#a2a2a2",
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
