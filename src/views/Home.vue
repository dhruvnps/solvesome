<template>
  <div class="home">
    <List />
  </div>
</template>

<script>
import List from "@/components/List.vue";

export default {
  name: "Home",
  components: {
    List,
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
