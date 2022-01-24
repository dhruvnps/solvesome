<template>
  <br />
  <div v-bind:class="{ error: emptyFields }">
    <h1 v-if="this.$route.path === '/login'">Log In</h1>
    <h1 v-else>Sign Up</h1>
    <form>
      <input
        v-if="this.$route.path === '/signup'"
        type="name"
        placeholder="Name"
        required
      />
      <input v-model="emailLogin" type="email" placeholder="Email" required />
      <input
        v-model="passwordLogin"
        type="password"
        placeholder="Password"
        required
      />
      <input type="submit" @click="() => {}" />
      <p class="forgot" v-if="this.$route.path === '/login'">
        <a href="#">Forgot your password?</a>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
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
</style>