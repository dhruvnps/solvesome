<template>
  <div class="list" :class="state">
    <div class="head">
      <h3>{{ this.title }}</h3>
      <router-link v-if="showCreateButton" to="/create" class="add">
        <span>+ Create Problem</span>
      </router-link>
    </div>
    <hr />
    <div v-for="problem in problems" :key="problem">
      <div class="item">
        <router-link :to="'/problem/' + problem.id" class="link">
          <span class="title">{{ problem.title }}</span>
          <div class="block"></div>
        </router-link>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "@/store";

export default {
  name: "Listitem",
  props: ["title", "problemGetter", "showCreateButton"],
  data() {
    var fetch = () =>
      setTimeout(() => {
        try {
          this.problemGetter(store.getters.getUser.uid).then((problems) => {
            this.problems = problems;
            this.state = "";
          });
        } catch {
          fetch();
        }
      }, 50);
    fetch();
    return {
      state: "loading",
      problems: [],
    };
  },
};
</script>

<style scoped>
.loading {
  opacity: 0;
  pointer-events: none;
}
.head h3 {
  font-weight: lighter;
}
.add span {
  font-weight: bold;
}
div.list {
  transition: 0.5s;
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
