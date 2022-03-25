<template>
  <br />
  <div>
    <!-- set header to login / signup depending on current page -->
    <h1 v-if="this.$route.path === '/login'">Log In</h1>
    <h1 v-else>Sign Up</h1>
    <form @submit.prevent="submit">
      <!-- required name input field -->
      <!-- only shown for signup page -->
      <input
        v-if="this.$route.path === '/signup'"
        v-model="name"
        placeholder="Name"
        required
      />
      <!-- required email input field -->
      <!-- passing type as email ensures input is an email -->
      <input v-model="email" type="email" placeholder="Email" required />
      <!-- required password input field -->
      <!-- passing type as password hides plaintext -->
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <!-- submit button calls submit method if fields inputted -->
      <input type="submit" />
      <!-- error span shows error message text to user -->
      <span class="error">{{ error }}</span>
    </form>
  </div>
</template>

<script>
import { computed } from "vue";
import { store } from "@/store";

export default {
  name: "Login",
  data() {
    return {
      // assign default values to data properties
      name: "",
      email: "",
      password: "",
      // get current user object from store
      error: computed(() => store.getters.getError),
    };
  },
  methods: {
    // invoked when submit button is clicked
    submit() {
      if (this.$route.path === "/signup") {
        // if page is signup, dispatch store signup action
        store.dispatch("signupAction", {
          // pass data properties
          name: this.name,
          email: this.email,
          password: this.password,
        });
      } else {
        // if page is login, dispatch store signup action
        store.dispatch("loginAction", {
          // pass data properties
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>

<style scoped>
input {
  margin-right: 5px;
  margin-bottom: 10px;
  padding: 5px;
}
form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 400px;
}
input {
  font-family: inherit;
  color: var(--primary);
}
.error {
  text-transform: capitalize;
  color: red;
}
</style>