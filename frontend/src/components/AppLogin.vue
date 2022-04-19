<template>
  <v-card dark flat>
    <span> {{ loggedIn }}</span>
    <div>
      <v-text-field v-model="email" label="Login"> </v-text-field>
      <v-text-field v-model="password" label="Password"> </v-text-field>
    </div>
    <v-btn color="primary" @click="login"> Login With Email </v-btn>
    <v-btn> Forgot Password </v-btn>
  </v-card>
</template>
<script lang="ts">
import AuthorizationService from "../services/AuthorizationService";
export default {
  name: "AppLogin",
  data() {
    return {
      email: "",
      password: "",
      user: "",
    };
  },
  computed: {
    loggedIn(): string {
      return `${(this as any).user} has logged in`;
    },
  },
  methods: {
    login() {
      AuthorizationService.login({
        email: (this as any).email,
        password: (this as any).password,
      }).then((response) => {
        console.log(response);
        (this as any).$store.dispatch("setToken", response.token);
        (this as any).$store.dispatch("setUser", response.user);
        (this as any).user = response.user.email;
      });
    },
  }
</script>
