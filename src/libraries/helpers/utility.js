import { Map } from "immutable";

export function clearToken() {
  localStorage.removeItem("id_token");
  //localStorage.removeItem("access_token");
  //localStorage.removeItem("refresh_token");
}

export function getToken() {
  try {
    const idToken = localStorage.getItem("id_token");
    return new Map({ idToken });
  } catch (err) {
    clearToken();
    return new Map();
  }
}
