import axios from "axios";

export function api() {
  return axios.create({
    baseURL: "https://kriptoloji-api-ege.onrender.com"
  });
}
