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
h3,
h2 {
  font-weight: 500;
}
hr {
  border: 0;
  border-top: 1px solid var(--primary);
  margin: 0;
  opacity: 0.1;
  transition: 0.2s;
}
#app {
  --primary: rgb(80, 80, 80);
  --padding-width: 100px;
  --padding-height: 50px;
  padding: var(--padding-height) var(--padding-width);
  font-family: Avenir, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary);
}
</style>
