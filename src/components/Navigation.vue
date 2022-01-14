<template>
  <div class="bar">
    <router-link to="/">
      <span class="title">solvesome</span>
    </router-link>
    <div class="right">
      <span>Profile</span>
      <span>Logout</span>
    </div>
  </div>
  <br />
</template>

<script>
export default {
  name: "Navigation",
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
