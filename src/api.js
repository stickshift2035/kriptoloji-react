import axios from "axios";

export function api() {
  return axios.create({
    baseURL: "https://egeapi.herokuapp.com"
  });
}
