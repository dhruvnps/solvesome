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
      <p class="forgot" v-if="this.$route.path === '/login'">
        <a href="#">Forgot your password?</a>
      </p>
      <span class="error">{{ error }}</span>
    </form>
  </div>
</template>

<script>
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async submit() {
      this.error = "";
      try {
        if (this.$route.path === "/signup") {
          await createUserWithEmailAndPassword(auth, this.email, this.password);
          this.$router.push("/");
        } else {
          await signInWithEmailAndPassword(auth, this.email, this.password);
          this.$router.push("/");
        }
      } catch (err) {
        this.error = /\(([^)]+)\)/
          .exec(err.message)[0]
          .replace(/[\W_]+/g, " ")
          .replace("auth", "");
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