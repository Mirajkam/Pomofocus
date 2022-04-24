<template>
  <v-card dark flat>
    <v-card-title> Sign-In </v-card-title>
    <div>
      <div>
        <v-text-field v-model="email" label="Login"> </v-text-field>
        <v-text-field v-model="password" label="Password"> </v-text-field>
      </div>
      <v-btn color="primary" @click="login"> Login With Email </v-btn>
      <v-btn> Forgot Password </v-btn>
      <v-btn @click="navToRegister"> Register </v-btn>
    </div>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import AuthorizationService from "../services/AuthorizationService";
enum loginStates {
  Login,
  Register,
  PasswordChange,
}
export default defineComponent({
  name: "AppLogin",
  data() {
    return {
      loginMode: loginStates.Login,
      email: "",
      password: "",
      user: "",
    };
  },
  computed: {
    loggedIn(): string {
      return `${this.user} has logged in`;
    },
  },
  methods: {
    login() {
      AuthorizationService.login({
        email: this.email,
        password: this.password,
      }).then((response) => {
        console.log(response);
        this.$store.dispatch("setToken", response.token);
        this.$store.dispatch("setUser", response.user);
        this.user = response.user.email;
        console.log(this.$store.state.user.email);
      });
    },

    navToRegister() {
      this.$router.push({ name: "register" });
    },
  },
});
</script>
