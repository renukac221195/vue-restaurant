<template>
  <v-layout v-if="!flag" align-center>
    <v-flex xs3 offset-xs5 offset-md2 offset-lg4>
      <v-card dark color="secondary">
        <v-spacer></v-spacer>
        <v-card-title align-center justify-center>Login</v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex xs-12>
              <v-text-field
                class="input-field"
                v-model="userEmail"
                :rules="emailRules()"
                label="E-mail"
                type="email"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs-12>
              <v-text-field
                class="input-field"
                v-model="password"
                :rules="passwordRules()"
                label="Password"
                type="password"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout xs-12>
            <v-flex xs-6 justify-xs-center>
              <v-card-actions>
                <v-btn class="btn1" color="success" @click="onLogin">Login</v-btn>
              </v-card-actions>
            </v-flex>
            <v-flex xs-6 justify-xs-center>
              <v-card-actions>
                <v-btn class="btn2" color="error" @click="onCancel">Cancel</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      userEmail: "",
      password: "",
      flag: false,
      user:[]
    };
  },
  computed:{
    userLogin() {
      return this.$store.getters.userLogin;
    }
  },
  methods: {
    emailRules() {
      return [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ];
    },
    passwordRules() {
      return [
        v => !!v || "Password is required",
        v =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
            v
          ) || "Password must be valid"
      ];
    },
    onLogin() {
      this.$store.dispatch("onLogin","/static/User.json")
      .then(response => {
        response.data.user.forEach(element => {
          if (
            element.email === this.userEmail &&
            element.password === this.password
          ) {
            this.flag = true;
            this.userType = element.type;
            localStorage.setItem('email', element.email);
            this.$emit("logIn", true);
            this.$router.push('/MenuList');
          }
        });
        if (this.flag == false) {
          alert("Invalid User");
        }
      });
    },
    onCancel() {
      this.email = this.password = "";
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #f9fbe7;
  overflow: hidden;
}
.box {
  border: 1px solid black;
  height: 400px;
  width: 400px;
  background-color: white;
}
.v-card-title {
  font-family: "Cute Font", cursive;
  font-weight: bold;
  font-size: 60px;
}
.input-field {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
  color: black;
}
.message {
  margin: 10px;
}
</style>
