<template>
  <div class="list" :class="state">
    <h3>Problems</h3>
    <div v-for="item in items" :key="item">
      <div class="item">
        <router-link :to="'/problem/' + item.id" class="link">
          <span class="title">{{ item.problem.Title }}</span>
          <div class="block"></div>
        </router-link>
        <hr />
      </div>
    </div>
    <br />
    <br />
    <router-link to="/create" class="add">
      <span>+ Create Problem</span>
    </router-link>
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
div.list {
  transition: 1s;
}
.link {
  padding-top: 15px;
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
.item hr {
  border: 0;
  border-top: 1px solid var(--primary);
  margin: 0;
  opacity: 0.1;
  transition: 0.2s;
}
.item:hover hr {
  opacity: 1;
}
.add {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--primary);
  transition: 0.2s;
}
</style>
