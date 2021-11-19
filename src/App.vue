<template>
  <Navigation />
  <router-view />
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
}
* {
  margin: 0;
}
#app {
  --primary: #505050;
  padding: 50px 100px;
  font-family: Avenir, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary);
}
</style>
