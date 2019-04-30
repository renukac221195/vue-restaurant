<template>
  <v-app>
    <app-header v-if="change" @logIn="isAuthenticated"></app-header>
    <v-container>
      <!-- <login-form v-if="!change" @logIn="isAuthenticated"></login-form>
      <app-data-table v-if="change"></app-data-table> -->
      <router-view @logIn="isAuthenticated"></router-view>
    </v-container>
    <app-footer v-if="change"></app-footer>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import LoginForm from "./components/LoginForm.vue";
import Footer from "./components/Footer.vue";
import MenuList from "./components/MenuList.vue";

export default {
  name: "App",
  components: {
    "app-header": Header,
    "login-form": LoginForm,
    "app-footer": Footer,
    "app-data-table": MenuList
  },
  data() {
    return {
      change: false
    };
  },
  methods: {
    isAuthenticated(flag) {
      console.log(flag)
      this.change = flag;
    }
  },
  created(){
    if(window.localStorage.email)
    {
      this.$router.push('/MenuList');
      this.change = true;
    }
    // console.log(window.localStorage.name)
  }
};
</script>


