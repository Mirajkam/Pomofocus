import axios from "axios";
import store from "@/store/store";
//Factory files to create an axios object with a default configuration
export default function axiosCreate() {
  return axios.create({
    baseURL: `http://localhost:3000`,
    headers: {
      Authorization: `Bearer ${store.state.jwtSessionToken}`,
    },
  });
}
