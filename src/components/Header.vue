<template>
  <div>
    <v-layout>
      <v-toolbar dark color="blue-grey">
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">Welcome</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <!-- <v-list> -->

          <router-link to="/Home" name="Home" @click="goTo('/Home')"><v-btn flat>Home
          </v-btn></router-link>
          
            <router-link to="/Gallery" name="Gallery" @click="goTo('/Gallery')"><v-btn flat>Gallery</v-btn></router-link>
          
          
            <router-link to="/AboutUs" name="AboutUs" @click="goTo('/AboutUs')"><v-btn flat>About Us</v-btn></router-link>
          
        </v-toolbar-items>
        <v-toolbar-items>
          <v-btn flat @click="onLogout">Logout</v-btn>

<!-- </v-list> -->
        </v-toolbar-items>
      </v-toolbar>
    </v-layout>
    <v-layout wrap>
      <v-navigation-drawer v-model="drawer" temporary absolute>
        <v-list class="pa-1">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile v-for="item in items" :key="item.title">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile> 
          <!-- <v-list-tile>            
            <v-list-tile-content>
              <v-list-tile-title>
                <v-router-link to="/Home">Home</v-router-link>
                <v-router-link to="/Gallery">Gallery</v-router-link>
                <v-router-link to="/AboutUs">AboutUs</v-router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile> -->
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      userType: "",
      drawer: null,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" },
        { title: "Gallery" }
      ]
    };
  },

  methods: {
    onLogout() {
      this.$emit("logIn", false);
      this.$router.push('/');
    },
    goTo(path){
      console.log(path)
      this.$router.push(path);
    }
  }
};
</script>