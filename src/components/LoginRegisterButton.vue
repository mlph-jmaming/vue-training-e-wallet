<template>
  <div class="center-content">
    <div class="button-container">
      <div
        v-if="!this.isLogin"
        class="login button-hover"
        @click="gotoLogin"
        v-on:refreshPage="refreshPage"
      >
        <h1>Login</h1>
      </div>
      <br />
      <div
        v-if="!this.isLogin"
        class="register button-hover"
        @click="gotoRegister"
      >
        <h1>Register</h1>
      </div>
      <br />
      <div
        v-if="this.isLogin != undefined"
        class="logout button-hover"
        @click="logOut"
      >
        <h1>Logout</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  props: ["userList"],
  data() {
    return {
      isLogin: undefined,
    };
  },
  created() {
    this.isLogin = localStorage.getItem("loggedInUser");
  },
  methods: {
    gotoLogin() {
      this.$router.push({ name: "Login", params: { users: this.userList } });
    },
    gotoRegister() {
      this.$router.push({ path: "/register" });
    },
    logOut() {
      localStorage.removeItem("loggedInUser");
      this.$router.push({ path: "/" });
      this.isLogin = undefined;
    },
    refreshPage() {
      this.this.isLogin = localStorage.getItem("loggedInUser");
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  background: tan;
}

.button-container {
  width: 800px;
  height: 100%;
}

.register {
  width: 100%;
  background: rgb(177, 177, 31);
}

.logout {
  width: 100%;
  background: rgb(69, 107, 151);
}
</style>
