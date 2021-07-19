<template>
  <div class="center-content">
    <form @submit="submitTransaction">
      <div class="container">
        <label for="cname"
          ><h1>{{ this.title }}</h1></label
        >
        <br />
        <!-- CASHIN -->
        <div v-if="this.$route.query.transaction == 'cashin'">
          <label for="caccountnumber"><b>Amount</b></label>
          <input
            type="text"
            @keypress="isNumber($event)"
            v-model="cashInAmount"
            placeholder="Enter Amount"
            required
          />
          <button>Send</button>
        </div>

        <!-- CASHOUT -->
        <div v-if="this.$route.query.transaction == 'cashout'">
          <label for="caccountnumber"><b>Amount</b></label>
          <input
            type="text"
            v-model="cashOutAmount"
            placeholder="Enter Amount"
            @keypress="isNumber($event)"
            required
          />
          <button>Send</button>
        </div>

        <!-- DONATE -->
        <div v-if="this.$route.query.transaction == 'donate'">
          <label for="cname"><b>Charity Name</b></label>
          <input
            type="text"
            v-model="donateCharityName"
            placeholder="Enter Charity Name"
            required
          />

          <label for="caddress"><b>Account Name</b></label>
          <input
            type="text"
            v-model="donateAccountName"
            placeholder="Enter Account Name"
            required
          />

          <label for="caddress"><b>Account Number</b></label>
          <input
            type="text"
            v-model="donateAccountNumber"
            placeholder="Enter Account Number"
            @keypress="isNumber($event)"
            required
          />

          <label for="caccountnumber"><b>Amount</b></label>
          <input
            type="text"
            v-model="donateAmount"
            placeholder="Enter Amount"
            @keypress="isNumber($event)"
            required
          />
          <button>Send</button>
        </div>

        <!-- TRANSFER -->
        <div v-if="this.$route.query.transaction == 'transfer'">
          <label for="caddress"><b>Account Number</b></label>
          <input
            type="text"
            v-model="transferAccountNumber"
            placeholder="Enter Account Number"
            @keypress="isNumber($event)"
            required
          />

          <label for="caccountnumber"><b>Amount</b></label>
          <input
            type="text"
            v-model="transferAmount"
            placeholder="Enter Amount"
            @keypress="isNumber($event)"
            required
          />
          <button>Send</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Cash In",
      isTransferCompleted: false,
    };
  },
  methods: {
    submitTransaction() {
      var currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
      switch (this.title) {
        case "Cash In":
          currentUser.balance += parseInt(this.cashInAmount);
          this.updateAccount(currentUser);
          this.$router.push({ path: "dashboard" });
          location.reload();
          break;
        case "Cash Out":
          currentUser.balance -= parseInt(this.cashOutAmount);
          this.updateAccount(currentUser);
          this.$router.push({ path: "dashboard" });
          location.reload();
          break;
        case "Donate":
          currentUser.balance -= parseInt(this.donateAmount);
          this.sendAmount(this.donateAmount, this.donateAccountNumber);
          if (this.isTransferCompleted) {
            this.updateAccount(currentUser);
          }
          this.isTransferCompleted = false;
          this.$router.push({ path: "dashboard" });
          location.reload();
          break;
        case "Transfer Funds":
          currentUser.balance -= parseInt(this.transferAmount);
          this.sendAmount(this.transferAmount, this.transferAccountNumber);
          if (this.isTransferCompleted) {
            this.updateAccount(currentUser);
          }
          this.isTransferCompleted = false;
          this.$router.push({ path: "dashboard" });
          location.reload();
          break;
      }
    },
    sendAmount(amount, accountNumber) {
      var newUserList = JSON.parse(localStorage.getItem("accountList"));
      console.log(newUserList);
      for (var x = 0; x < newUserList.length; x++) {
        var user = newUserList[x];
        console.log(user.accountNumber);
        console.log(accountNumber);
        console.log("----");
        if (user.accountNumber == accountNumber) {
          console.log("correct");
          newUserList[x].balance += parseInt(amount);
          localStorage.setItem("accountList", JSON.stringify(newUserList));
          this.isTransferCompleted = true;
          return;
        }
      }
      alert("Account number does not exist");
      return false;
    },
    updateAccount(currentUser) {
      var userList = JSON.parse(localStorage.getItem("accountList"));
      for (var x = 0; x < userList.length; x++) {
        var user = userList[x];
        if (user.userName === currentUser.userName) {
          userList[x] = currentUser;
          localStorage.setItem("accountList", JSON.stringify(userList));
          // if (this.title === "Cash In" || this.title === "Cash Out") {
          localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
          // }
          return;
        }
      }
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
  created() {
    switch (this.$route.query.transaction) {
      case "cashin":
        this.title = "Cash In";
        break;
      case "cashout":
        this.title = "Cash Out";
        break;
      case "donate":
        this.title = "Donate";
        break;
      case "transfer":
        this.title = "Transfer Funds";
        break;
    }
  },
};
</script>

<style scoped>
.hide {
  visibility: hidden;
}
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
