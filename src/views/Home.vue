<template>
  <div class="home">
    <List />
    <Add />
  </div>
</template>

<script>
import List from "@/components/List.vue";
import Add from "@/components/Add.vue";

export default {
  name: "Home",
  components: {
    List,
    Add,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
