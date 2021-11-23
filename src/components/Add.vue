<template>
  <div class="add">
    <span>+ Create Problem</span>
  </div>
</template>

<script>
export default {
  name: "Add",
};
</script>

<style scoped>
div.add {
  position: absolute;
  bottom: var(--padding-height);
  left: var(--padding-width);
  height: 50px;
  width: calc(100% - calc(2 * var(--padding-width)));
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--primary);
  transition: 0.2s;
}
</style>