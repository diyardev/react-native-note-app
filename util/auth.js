import axios from "axios";

const API_URL = "https://diyar.net.tr/dnot/api";

export async function authenticate(mode, email, password, name, phone, photo) {
  if (mode == "signInWithPassword") {
    const response = await axios.post(`${API_URL}/user.php`, {
      islem: "login",
      email: email,
      password: password,
    });
    return response.data;
  }

  if (mode == "signUp") {
    const response = await axios.post(`${API_URL}/user.php`, {
      islem: "signup",
      email: email,
      name: name,
      phone: phone,
      password: password,
      photo: photo,
    });
    return response.data;
  }
}

export function createUser(email, password, name, phone, photo) {
  return authenticate("signUp", email, password, name, phone, photo);
}

export async function updateUser(data) {
  const response = await axios.post(`${API_URL}/user.php`, {
    islem: "updateUser",
    email: data.email,
    name: data.name,
    phone: data.phone,
    userId: data.userId,
  });
  return response.data;
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

export async function getUser(email) {
  const response = await axios.post(`${API_URL}/user.php`, {
    islem: "getUser",
    email: email,
  });

  return response.data;
}
