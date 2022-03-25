<template>
  <!-- the navigation bar is displayed on every page -->
  <div class="bar">
    <!-- link to home page -->
    <router-link to="/">
      <span class="title">solvesome</span>
    </router-link>
    <div class="right">
      <!-- link to signup page if current page is login -->
      <router-link to="/signup" v-if="this.$route.path === '/login'">
        <span>Sign Up</span>
      </router-link>
      <!-- link to login page if current page is signup -->
      <router-link to="/login" v-else-if="this.$route.path === '/signup'">
        <span>Log In</span>
      </router-link>
      <div class="logged" v-else>
        <!-- logout button if user is logged in -->
        <div @click="logout">
          <span>Logout</span>
        </div>
        <!-- user profile button if user is logged in -->
        <router-link to="/profile">
          <span> &nbsp;|&nbsp;&nbsp;&nbsp;{{ user ? user.name : "" }} </span>
        </router-link>
      </div>
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
      // get current user object from the store
      user: computed(() => store.getters.getUser),
    };
  },
  methods: {
    // invoked when the logout button is clicked
    logout() {
      // dispatch the logout action in the store
      store.dispatch("logoutAction");
    },
  },
};
</script>

<style scoped>
.logged {
  display: flex;
  flex-direction: row;
}
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
