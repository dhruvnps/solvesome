<template>
  <div class="list" :class="state">
    <div class="head">
      <h3>Problems</h3>
      <router-link to="/create" class="add">
        <span>+ Create Problem</span>
      </router-link>
    </div>
    <hr />
    <div v-for="item in items" :key="item">
      <div class="item">
        <router-link :to="'/problem/' + item.id" class="link">
          <span class="title">{{ item.problem.Title }}</span>
          <div class="block"></div>
        </router-link>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import DBService from "../dbservice";

export default {
  name: "Listitem",
  data() {
    DBService.getProblems().then((col) => {
      this.items = col.docs.map((doc) => ({ problem: doc.data(), id: doc.id }));
      this.state = "";
    });
    return {
      state: "loading",
      items: [],
    };
  },
};
</script>

<style scoped>
.loading {
  opacity: 0;
}
.head h3 {
  font-weight: lighter;
}
.add span {
  font-weight: bold;
}
div.list {
  transition: 1s;
}
.link {
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.head {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.title {
  font-size: x-large;
  font-weight: lighter;
}
.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.item:hover hr {
  opacity: 1;
}
</style>
