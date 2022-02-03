<template>
  <br />
  <div>
    <h1 v-if="this.$route.path === '/login'">Log In</h1>
    <h1 v-else>Sign Up</h1>
    <form @submit.prevent="submit">
      <input
        v-if="this.$route.path === '/signup'"
        v-model="name"
        placeholder="Name"
        required
      />
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <input type="submit" />
      <span class="error">{{ error }}</span>
    </form>
  </div>
</template>

<script>
import { computed } from "vue";
import { store } from "@/store";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: computed(() => store.getters.getError),
    };
  },
  methods: {
    async submit() {
      if (this.$route.path === "/signup") {
        store.dispatch("signupAction", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
      } else {
        store.dispatch("loginAction", {
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
}
.error {
  text-transform: capitalize;
  color: red;
}
</style>