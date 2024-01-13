import axios from "axios";

const API_URL = "https://diyar.net.tr/dnot/api";

export async function storeNote(notData) {
  const response = await axios.post(`${API_URL}/note.php`, {
    islem: "createNote",
    userId: notData.userId,
    content: notData.content,
    title: notData.title,
  });
  return response.data;
}

export async function updateNote(notData) {
  const response = await axios.post(`${API_URL}/note.php`, {
    islem: "updateNote",
    noteId: notData.id,
    content: notData.content,
    title: notData.title,
  });
  return response.data;
}

export async function getNots(userId = false) {
  const response = await axios.post(`${API_URL}/note.php`, {
    islem: "getNotes",
    userId: userId,
  });
  return response.data;
}

export async function deleteNote(id) {
  const response = await axios.post(`${API_URL}/note.php`, {
    islem: "deleteNote",
    noteId: id,
  });
  return response.data;
}
