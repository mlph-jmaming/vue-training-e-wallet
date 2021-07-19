<template>
  <div class="center-content">
    <div v-bind:key="item.id" v-for="item in items">
      <div class="grid" @click="itemOnclick(item)">
        <img
          class="icon-size"
          :src="require(`@/assets/${item.icon}`)"
          alt="item"
        />
        <h3 class="title">{{ item.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],
  methods: {
    itemOnclick(item) {
      this.$router.push({
        path: "transaction",
        query: { transaction: item.transaction },
      });
    },
  },
};
</script>

<style scoped>
.container {
  height: auto;
  border-style: solid;
  border-color: white;
}

.title {
  text-align: center;
  margin: auto;
}

.icon-size {
  width: 150px;
  height: 150px;
}

/* Grid layout */
.grid {
  background-color: #ddedfb;
  list-style: none;
  margin: auto;
  padding: 20px;
  width: 250px;
}
.grid:hover {
  background: rgb(178, 196, 196);
  cursor: pointer;
}
</style>
