<template>
  <div class="bar">
    <router-link to="/">
      <span class="title">solvesome</span>
    </router-link>
    <div class="right">
      <router-link to="/signup" v-if="this.$route.path === '/login'">
        <span>Sign Up</span>
      </router-link>
      <router-link to="/login" v-else-if="this.$route.path === '/signup'">
        <span>Log In</span>
      </router-link>
      <router-link to="/profile" v-else>
        <span>{{ user ? user.name : "" }}</span>
      </router-link>
    </div>
  </div>
  <br />
</template>

<script>
import { store } from "@/store";
import { computed } from "vue";

export default {
  name: "Navigation",
  data() {
    return {
      user: computed(() => store.getters.getUser),
    };
  },
};
</script>

<style scoped>
div.bar {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
div.bar .right {
  display: flex;
  flex-direction: row;
  align-items: center;
}
div.bar .right span {
  padding-left: 10px;
  font-size: large;
}
span.title {
  font-size: xx-large;
}
span {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
</style>
