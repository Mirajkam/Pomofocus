import { User } from "@/app/types";
import axiosCreate from "@/axios";

const axios = axiosCreate();
const base = "http://localhost:3000";
export default {
  login(user: { email: string; password: string }) {
    return axios.post("/api/users/login", user).then((response) => {
      return response.data;
    });
  },

  register(user: User) {
    return axios.post("/api/users/register", user).then((response) => {
      return response.data;
    });
  },
};
