<template>
  <v-card dark class="pa-3 loginCard">
    <v-btn size="large" class="loginCard__loginGoogleButton">
      <v-icon class="mx-2" color="orange"> mdi-google</v-icon> Login in with
      Google</v-btn
    >
    <div class="app_divider"></div>
    <v-card-title class="pl-0"> Sign-In </v-card-title>

    <div class="loginCard__mainPanel">
      <div>
        <span class="loginCard__label"> Email </span>
        <v-text-field
          density="default"
          v-model="email"
          label="Login"
          :error-messages="
            isEmptyEmail === ''
              ? 'email cannot be empty'
              : '' || emailValidationError
          "
        >
        </v-text-field>
        <span class="loginCard__label"> Password </span>
        <v-text-field
          density="default"
          outlined
          v-model="password"
          label="Password"
          :error-messages="
            isEmptyEmail === ''
              ? 'email cannot be empty'
              : '' || emailValidationError
          "
        >
        </v-text-field>
      </div>
      <v-alert
        color="error"
        density="default"
        variant="text"
        class="pa-0 text-center"
        v-model="loginError"
      >
        {{ loginErrorMessage }}</v-alert
      >
      <div class="mainbuttonPanel">
        <v-btn
          flat
          :rounded="1"
          @click="loginWithEmail"
          class="mt-1 mainbuttonPanel__login-button"
          size="large"
        >
          Login With Email
        </v-btn>
        <v-btn
          :rounded="0"
          flat
          class=".mainbuttonPanel__login-button"
          size="large"
          :style="{ textDecoration: 'underline', color: 'grey' }"
        >
          <b>Forgot Password </b>
        </v-btn>
      </div>
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
      isInvalidEmail: false,
      isEmptyEmail: false,
      loginError: false,
      loginErrorMessage: "",
    };
  },
  computed: {
    loggedIn(): string {
      return `${this.user} has logged in`;
    },

    emailValidationError(): string {
      return this.isInvalidEmail ? "Please enter a valid email address" : "";
    },

    isEmptyCredentials(): boolean {
      return !(this.email && this.password);
    },
  },
  methods: {
    login(): void {
      AuthorizationService.login({
        email: this.email,
        password: this.password,
      })
        .then((response) => {
          this.$store.dispatch("setToken", response.token);
          this.$store.dispatch("setUser", response.user);
          localStorage.setItem("user", response.token);
          this.$router.push({ name: "home" });

          console.log(this.$store.state.user);
          this.user = response.user.email;
          console.log(this.$store.state.user.email);
        })
        .catch((error) => {
          console.log(error.response.status);
          switch (error.response.status) {
            case 500:
              this.setLoginAlert("something went wrong", true);
              break;
            default:
              console.log(error.response);
              this.setLoginAlert(error.response.data.message, true);
              break;
          }
        });
    },

    navToRegister(): void {
      this.$router.push({ name: "register" });
    },

    loginWithEmail(): void {
      this.isInvalidEmail = !this.email.match(
        // eslint-disable-next-line
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      if (!this.isInvalidEmail && !this.isEmptyCredentials) {
        this.login();
        this.isEmptyEmail = false;
      }
      {
        this.isEmptyEmail = true;
      }
    },

    setLoginAlert(mssg: string, show: boolean): void {
      this.loginErrorMessage = mssg;
      this.loginError = show;
    },
  },
});
</script>

<style scoped lang="scss">
.mainbuttonPanel {
  display: flex;
  flex-direction: column;
  gap: 10px 0px;
}

.mainbuttonPanel__login-button {
  background-color: rgb(15, 14, 14) !important;
  opacity: 75%;
  color: white;
}

.v-btn {
  text-transform: none;
  font-weight: 450;
}

.loginCard__loginGoogleButton {
  width: 100%;
  font-weight: 550;
  color: grey;
  font-size: 15px;
}

.loginCard {
  padding: 12px;
  position: relative;
}

.loginCard__divider {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  margin: 18px 0px;
  color: grey;
}

.loginCard__mainPanel {
  position: absolute;
  left: 5%;
  width: 90%;
  bottom: 2.5%;
}

.loginCard__label {
  padding: 8px 4px 4px 0px;
  font-weight: 550;
  font-size: 13px;
  text-transform: uppercase;
  font-family: "ArialRounded", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";

  color: rgb(196, 196, 196);
}
</style>
