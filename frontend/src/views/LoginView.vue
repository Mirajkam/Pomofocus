<template>
  <v-card>
    <AppLogin class="center"> </AppLogin>
  </v-card>
</template>

<script>
import AppLogin from "@/views/AppLogin.vue";
export default {
  name: "LoginView",
  components: {
    AppLogin,
  },
};
</script>

<style scoped>
.center {
  margin: auto;
  width: 50%;
}
</style>
