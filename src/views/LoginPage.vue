<template>
  <div class="center-content">
    <form @submit="userLogin">
      <div class="container">
        <label><b>Username</b></label>
        <input
          type="text"
          name="username"
          v-model="username"
          placeholder="Enter Username"
          required
        />
        <label><b>Password</b></label>
        <input
          type="password"
          v-model="password"
          placeholder="Enter Password"
          required
        />

        <button>Login</button>
        <label> <input type="checkbox" checked="checked" /> Remember me </label>
      </div>

      <div class="container" style="background-color: #f1f1f1">
        <button type="button" class="cancelbtn">Cancel</button>
        <span class="psw">Forgot <a href="#">password?</a></span>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      accountList: [],
    };
  },
  components: {},
  methods: {
    userLogin(e) {
      e.preventDefault();
      // fake api
      if (localStorage.accountList != undefined) {
        this.accountList = JSON.parse(localStorage.getItem("accountList"));
        this.checkAccount();
        return;
      } else {
        axios
          .get("https://mocki.io/v1/fabd1ecf-8d33-4c05-9da7-0dc94f2bb024")
          .then((response) => {
            if (localStorage.accountList == undefined) {
              this.accountList = response.data;
              localStorage.setItem(
                "accountList",
                JSON.stringify(this.accountList)
              );
              this.checkAccount();
            }
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      }
    },
    checkAccount() {
      for (var x = 0; x < this.accountList.length; x++) {
        var user = this.accountList[x];
        if (
          user.userName === this.username &&
          user.password === this.password
        ) {
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          this.$router.push({ path: "dashboard" });
          location.reload();
          return;
        }
      }
      alert("Username or Password incorrect.");
    },
  },
};
</script>

<style scoped>
form {
  width: 500px;
  border: 3px solid #f1f1f1;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>
