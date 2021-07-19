<template>
  <div id="app">
    <HeaderPage />
    <LoginRegisterButton v-bind:userList="userList" />
    <router-view />
  </div>
</template>

<script>
import HeaderPage from "./components/HeaderPage.vue";
import LoginRegisterButton from "./components/LoginRegisterButton.vue";
import axios from "axios";
export default {
  name: "app",
  components: {
    HeaderPage,
    LoginRegisterButton,
  },
  data() {
    return {
      userList: [],
    };
  },
  methods: {
    getUserList() {
      // fake api
      axios
        .get("https://mocki.io/v1/fabd1ecf-8d33-4c05-9da7-0dc94f2bb024")
        .then((response) => {
          this.userList = response.data;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
  },
  created() {
    this.getUserList();
  },
};
</script>

<style>
body {
  background: teal;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.button-hover:hover {
  cursor: pointer;
  background-color: rgb(178, 196, 196);
}

.center-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
