<template>
  <v-card dark class="pa-3">
    <v-card-title class="pa-0 pb-4"> Register </v-card-title>
    <div>
      <div>
        <v-text-field density="compact" v-model="name" label="Name">
        </v-text-field>
        <v-text-field density="compact" v-model="email" label="Email">
        </v-text-field>
        <v-text-field
          v-model="password"
          hint="atleast 6 characters"
          label="Password"
          density="compact"
          :error-messages="doPasswordsNotMatch"
        >
        </v-text-field>
        <v-text-field
          v-model="confirmPassword"
          label=" Confirm Password"
          density="compact"
          :error-messages="doPasswordsNotMatch"
        >
          <template #append><span class="text--primary"> Show </span></template>
        </v-text-field>
      </div>
      <v-btn
        @click="register"
        size="large"
        color="rgb(34, 34, 34)"
        :style="{
          width: '100%',
          color: 'white',
          textTransform: 'none',
          fontWeight: '400',
        }"
      >
        Register
      </v-btn>
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
      user: null,
      password: "",
      confirmPassword: "",
      passwordMatch: false,
    };
  },
  computed: {
    doPasswordsNotMatch(): string {
      return this.passwordMatch ? "Passwords do not match" : "";
    },
  },
  methods: {
    register() {
      if (this.password === this.confirmPassword) {
        this.passwordMatch = false;
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
      } else {
        this.passwordMatch = true;
      }
    },
  },
});
</script>
