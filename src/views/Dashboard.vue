<template>
  <div class="center-content">
    <div class="container">
      <h1 class="balance">Balance: {{ formatPrice(this.balance) }}</h1>
      <DashBoardItem v-bind:items="items" />
    </div>
  </div>
</template>

<script>
import DashBoardItem from "../components/DashboardItem.vue";
export default {
  components: {
    DashBoardItem,
  },
  data() {
    return {
      balance: 0,
      items: [
        {
          id: 1,
          icon: "cash_in.png",
          title: "Cash in",
          transaction: "cashin",
        },
        {
          id: 2,
          icon: "withdraw.png",
          title: "Cash out",
          transaction: "cashout",
        },
        {
          id: 3,
          icon: "donate.png",
          title: "Donate",
          transaction: "donate",
        },
        {
          id: 4,
          icon: "transfer_money.png",
          title: "Transfer",
          transaction: "transfer",
        },
      ],
    };
  },
  created() {
    var userLoggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log("current user");
    console.log(userLoggedIn);

    console.log("users");
    console.log(JSON.parse(localStorage.getItem("accountList")));
    this.balance = userLoggedIn.balance;
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return "P" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style scoped>
.balance {
  color: white;
}

.container {
  width: 800px;
}
</style>
