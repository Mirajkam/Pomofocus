<template>
  <v-card dark flat>
    <v-card-title> Register </v-card-title>
    <div>
      <div>
        <v-text-field v-model="name" label="Name"> </v-text-field>
        <v-text-field v-model="email" label="Email"> </v-text-field>
        <v-text-field
          v-model="password"
          hint="atleast 6 characters"
          label="Password"
          :error-messages="doPasswordsNotMatch ? 'Passwords do not mathc' : ''"
        >
        </v-text-field>
        <v-text-field
          v-model="confirmPassword"
          label=" Confirm Password"
          :error-messages="doPasswordsNotMatch ? 'Passwords do not mathc' : ''"
        >
        </v-text-field>
      </div>
      <v-btn color="primary" @click="register"> Register </v-btn>
    </div>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import AuthorizationService from "../services/AuthorizationService";
export default defineComponent({
  name: "AppLogin",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    loggedIn(): string {
      return `${this.user} has logged in`;
    },
    doPasswordsNotMatch(): boolean {
      return this.password !== this.confirmPassword;
    },
  },
  methods: {
    register() {
      AuthorizationService.register({
        name: this.name,
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

    switchLoginMode(mode) {
      this.loginMode = mode;
    },
  },
});
</script>
