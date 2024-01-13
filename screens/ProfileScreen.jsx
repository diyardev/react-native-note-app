import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import AuthContextProvider, { AuthContext } from "../store/auth-context";
import ImagePicker from "react-native-image-crop-picker";
import axios from "axios";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";
import HeaderNavbar from "../components/HeaderNavbar";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Formik, useFormik, useFormikContext } from "formik";
import SignUpScreen from "./SignUpScreen";
import { updateUser } from "../util/auth";

export default function ProfileScreen() {
  const authContext = useContext(AuthContext);
  if (authContext.authUser && authContext.authUser.photo) {
    var defaultImg = authContext.authUser.photo;
  } else {
    var defaultImg = "https://diyar.net.tr/dnot/assets/img/user.png";
  }

  const [photo, setPhoto] = useState(defaultImg);

  const formik = useFormik({
    enableReinitialize: true,
    validateOnBlur: false,
    initialValues: {
      name: authContext.authUser.name,
      email: authContext.authUser.email,
      phone: authContext.authUser.phone,
      userId: authContext.authUser.id,
    },
    onSubmit: async (values) => {
      try {
        const response = await updateUser(values);
        await authContext.setUserData(response.user);
       showMessage({
        message: response.status == "danger" ? "Hata!" : "Başarılı!",
        description: response.message,
        type: response.status,
        autoHide: 5000,
      });
      } catch (error) {
        console.log(error);
      }
    },
  });

  async function selectImage() {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    }).then(async (image) => {
      var formData = new FormData();
      formData.append("profileImage", {
        uri: image.path,
        type: image.mime,
        name: "profileImage.jpg",
      });
      formData.append("userId", authContext.authUser.id);

      const response = await axios({
        method: "post",
        url: "https://diyar.net.tr/dnot/api/user.php",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      showMessage({
        message: response.data.status == "danger" ? "Hata!" : "Başarılı!",
        description: response.data.message,
        type: response.data.status,
        autoHide: 5000,
      });
      await authContext.setUserData(response.data.user);
      setPhoto(response.data.user.photo);
    });
  }

  const HeaderNavbarRightContent = (
    <TouchableOpacity
      onPress={() => {
        formik.handleSubmit();
      }}
    >
      <Feather name="save" size={28} color="white" />
    </TouchableOpacity>
  );

  return (
    <View>
      <HeaderNavbar title="Profilim" rightContent={HeaderNavbarRightContent} />
      <View style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.inputArea}>
              <Image
                style={styles.profile}
                source={{ uri: photo, cache: "reload" }}
              />
              <View style={{ alignSelf: "center", marginTop: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "black",
                    padding: 10,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "bold",
                      color: "white",
                    }}
                    onPress={selectImage}
                  >
                    RESİM SEÇ
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.inputArea}>
            <Text style={styles.label}> İsim</Text>
            <TextInput
              onChangeText={formik.handleChange("name")}
              value={formik.values.name}
              autoComplete="name"
              style={styles.input}
            />
          </View>

          <View style={styles.inputArea}>
            <Text style={styles.label}> E-POSTA</Text>
            <TextInput
              onChangeText={formik.handleChange("email")}
              value={formik.values.email}
              autoComplete="email"
              style={styles.input}
            />
          </View>

          <View style={styles.inputArea}>
            <Text style={styles.label}> TELEFON</Text>
            <TextInput
              onChangeText={formik.handleChange("phone")}
              value={formik.values.phone}
              style={styles.input}
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "grey",
    marginTop: 25,
  },
  input: {
    backgroundColor: "#F6F8FA",
    fontSize: 15,
    padding: 5,
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 10,
    borderBottomWidth: 2,
    borderColor: "#bfbfbf",
  },
  profile: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
});
