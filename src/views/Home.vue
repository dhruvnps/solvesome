<template>
  <div class="home">
    <List
      title="Problems"
      :problemGetter="getAllProblems"
      :showCreateButton="true"
    />
  </div>
</template>

<script>
import List from "@/components/List.vue";
import DBService from "@/core/dbservice";

export default {
  name: "Home",
  components: {
    List,
  },
  methods: {
    getAllProblems: DBService.getAllProblems,
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
