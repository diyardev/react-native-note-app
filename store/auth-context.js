import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const AuthContext = createContext({
  token: "",
  authUser: null,
  isAuthenticated: false,
  authenticate: (token, authUser) => {},
  setUserData: (authUser) => {},
  logout: () => {},
  loading: true,
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      const storedAuthUser = await AsyncStorage.getItem("authUser");
      if (storedAuthUser) {
        setAuthUser(JSON.parse(storedAuthUser));
      }
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setAuthToken(storedToken);
      }

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }

    fetchToken();
  }, []);

  async function authenticate(token, authUser) {
    await setAuthUser(authUser);
    await setAuthToken(token);
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("authUser", JSON.stringify(authUser));
  }

  async function setUserData(authUser) {
    setAuthUser(authUser);
    await AsyncStorage.setItem("authUser", JSON.stringify(authUser));
  }

  async function logout(token) {
    setAuthToken(null);
    setAuthUser(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("authUser");
    if ((await AsyncStorage.getItem("googleSignActive")) === "1") {
      await AsyncStorage.removeItem("googleSignActive");
      await GoogleSignin.signOut();
    }
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    setUserData: setUserData,
    authUser: authUser,
    loading: loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
