<template>
  <div class="center-content">
    <form @submit="registerUser">
      <div class="container">
        <label for="cname"><b>Name</b></label>
        <input
          type="text"
          v-model="name"
          placeholder="Enter Complete Name"
          required
        />

        <label for="caddress"><b>Address</b></label>
        <input
          type="text"
          v-model="address"
          placeholder="Enter Complete Address"
          required
        />

        <label for="caccountnumber"><b>Account Number</b></label>
        <input
          type="text"
          v-model="accountNumber"
          placeholder="Enter Account number"
          @keypress="isNumber($event)"
          required
        />

        <label for="uname"><b>Username</b></label>
        <input
          type="text"
          v-model="username"
          placeholder="Enter Username"
          required
        />

        <label for="psw"><b>Password</b></label>
        <input
          type="password"
          v-model="password"
          placeholder="Enter Password"
          required
        />

        <button>Register</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  created() {
    this.accountList = JSON.parse(localStorage.getItem("accountList"));
  },
  data() {
    return {
      accoutList: [],
    };
  },
  methods: {
    registerUser() {
      for (var x = 0; x < this.accountList.length; x++) {
        var user = this.accountList[x];
        if (user.userName === this.username) {
          alert("Account already exist");
          return;
        }
      }
      var newUserAccount = {
        name: this.name,
        address: this.address,
        accountNumber: parseInt(this.accountNumber),
        balance: 0,
        userName: this.userName,
        password: this.password,
      };
      this.accountList.push(newUserAccount);
      localStorage.setItem("accountList", JSON.stringify(this.accountList));
      localStorage.setItem("loggedInUser", JSON.stringify(newUserAccount));
      this.$router.push({ path: "dashboard" });
      location.reload();
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
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
