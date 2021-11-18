<template>
  <Navigation />
  <br />
  <br />
  <Problem v-if="false" ID="E87gT51b1gLwGlBs67B6" />
  <List />
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Problem from "./components/Problem.vue";
import List from "./components/List.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Problem,
    List,
  },
};
</script>

<style>
* {
  margin: 0;
}
#app {
  --primary: #2c3e50;
  padding: 50px 100px;
  font-family: Avenir, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary);
}
</style>
