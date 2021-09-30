<template>
  <Navigation />
  <Problem />
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Problem from "./components/problem/Description.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Problem,
  },
};
</script>

<style>
* {
  margin: 0;
}
#app {
  padding: 50px 100px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
