import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getNots, deleteNote } from "../util/requests";
import database from "@react-native-firebase/database";
import HeaderNavbar from "../components/HeaderNavbar";
import firestore from "@react-native-firebase/firestore";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../store/auth-context";
import { formatUpdateTimestamp } from "../util/funcs";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";



export default function HomeScreen() {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const isFocused = useIsFocused();

  async function setNotesData() {
    var userId = authContext.authUser.id;
    var notesData = await getNots(userId);
    setNotes(notesData.notes);
  }

  useEffect(() => {
    if (isFocused) {
      setNotesData();
    }
    setLoading(false);
  }, [isFocused]);

  const handleLongPress = (itemId) => {
    Alert.alert(
      "Notu Sil",
      "Bu notu silmek istediğinize emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Sil",
          onPress: async () => {
            const response = await deleteNote(itemId);
            setNotesData();
            showMessage({
              message: response.status == "danger" ? "Hata!" : "Başarılı!",
              description: response.message,
              type: response.status,
              autoHide: 5000,
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderNavbar hideBackButton={true} title="Anasayfa" />
     
      {loading ? (
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: "100%", height: 100 }}
            source={require("../assets/loading.gif")}
          />
        </View>
      ) : (
        <View style={styles.container}>
           <FlashMessage position="top" />
          {notes.length <= 0 && (
            <Text style={styles.text}>Herhangi bir not bulunmadı.</Text>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("NotCreate")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>NOT EKLE</Text>
          </TouchableOpacity>
              <FlatList
                style={styles.list}
                data={Object.values(notes)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ShowNot", { notData: item });
                    }}
                    onLongPress={() => handleLongPress(item.id)}
                    style={styles.listItemContainer}
                  >
                    <Text style={styles.listItemTitle}>
                      {item.title.length > 30
                        ? item.title.substring(0, 30) + "..."
                        : item.title}
                    </Text>
                    <Text style={styles.listItemContent}>
                      {item.content.length > 80
                        ? item.content.substring(0, 80) + "..."
                        : item.content}
                    </Text>
                    <Text style={styles.listItemUpdateTime}>
                      {formatUpdateTimestamp(item.updated_date)}
                    </Text>
                  </TouchableOpacity>
                )}
              />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  text: {
    fontSize: 18,
  },
  listItemUpdateTime: {
    position: "absolute",
    right: 10,
    top: 8,
    fontSize: 12,
    color: "#a1a1a1",
  },
  list: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
    height : 'auto',
    maxHeight : 550
  },
  listItemContainer: {
    padding: 15,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  listItemContent: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    backgroundColor: "black",
    borderRadius: 5,
    padding: 10,
  },
});
