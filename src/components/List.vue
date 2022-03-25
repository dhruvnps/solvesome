<template>
  <div class="list" :class="state">
    <div class="head">
      <!-- display list title passed to component -->
      <h3>{{ this.title }}</h3>
      <!-- display create problem button if showCreateButton -->
      <!-- this button links to the create page -->
      <router-link v-if="showCreateButton" to="/create" class="add">
        <span>+ Create Problem</span>
      </router-link>
    </div>
    <hr />
    <!-- iterate over list of problem objects -->
    <div v-for="problem in problems" :key="problem">
      <div class="item">
        <!-- link each list item to respective problem page url -->
        <router-link :to="'/problem/' + problem.id" class="link">
          <!-- display problem title on each list item -->
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
  // define properties passed to list component
  props: ["title", "problemGetter", "showCreateButton"],
  data() {
    var fetch = () =>
      setTimeout(() => {
        try {
          // fetch list of problem objects with passed problem getter
          // the current user uid from store is passed to the getter
          // this will return an error if the store has not loaded
          this.problemGetter(store.getters.getUser.uid).then((problems) => {
            // set problems property to fetched problems object list
            this.problems = problems;
            // remove loading from state
            this.state = "";
          });
        } catch {
          // try fetching problems again if the store has not loaded
          fetch();
        }
      }, 50);
    fetch();
    return {
      // set state to loading
      state: "loading",
      // initialize problems list to empty
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
