<template>
  <Navigation />
  <br />
  <br />
  <Listitem v-if="1" ID="E87gT51b1gLwGlBs67B6" />
  <Listitem v-if="1" ID="xXlpJr6fLKvCxNew77Ke" />

  <Problem v-if="0" ID="E87gT51b1gLwGlBs67B6" />
  <Problem v-if="0" ID="xXlpJr6fLKvCxNew77Ke" />
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Problem from "./components/Problem.vue";
import Listitem from "./components/Listitem.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Problem,
    Listitem,
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary);
}
</style>
