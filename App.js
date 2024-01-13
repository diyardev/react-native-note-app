import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext } from "react";
import NotCreate from "./components/not/NotCreate";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/ProfileScreen";
import Logout from "./screens/Logout";
import ShowNot from "./components/not/ShowNot";
import { RecoilRoot } from "recoil";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NormalStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
        contentStyle: {},
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: "Giriş",
        }}
      />
      <Stack.Screen
        options={{
          headerTitle: "Kayıt",
        }}
        name="Signup"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
}

function AfterAuthenticatedStack() {

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarActiveTintColor: "black", // Aktif tab'ın rengi
        tabBarInactiveTintColor: "grey", // Pasif tab'ların rengi
        tabBarLabelStyle: {
          fontSize: 12,
          textAlign: "center",
          alignSelf: "center",
        },
        tabBarStyle: {
          height: 70,
        },
        tabBarItemStyle: {
          paddingBottom: 10,
          paddingTop: 10,
        },
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
        contentStyle: {},
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Anasayfa",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="NotCreate"
        component={NotCreate}
        options={{
          headerTitle: "Not Oluştur",
          headerShown: false,
          tabBarLabel: "Not Oluştur",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Profilim",
          headerShown: false,
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          headerShown: false,
          tabBarLabel: "Çıkış",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="exit-to-app" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeStackScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ShowNot" component={ShowNot} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authContext = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <NormalStack />}
      {authContext.isAuthenticated && <AfterAuthenticatedStack />}

      {authContext.loading && (
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1387219837,
          }}
        >
          <Image
            style={{ width: "100%", height: 80 }}
            source={require("./assets/loading.gif")}
          />
        </View>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <RecoilRoot>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});
