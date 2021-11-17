<template>
  <div class="bar">
    <span class="title">solvesome</span>
    <div class="right">
      <span>Profile</span>
      <span>Logout</span>
    </div>
  </div>
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
  padding-right: 10px;
  font-size: x-large;
}
span.title {
  font-weight: bold;
  font-size: xx-large;
}
</style>
