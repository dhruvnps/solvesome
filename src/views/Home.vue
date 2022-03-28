<template>
  <div class="home">
    <!-- embed list component and pass problem getter -->
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
  components: { List },
  methods: {
    // pass get all problems method from database service
    getAllProblems: DBService.getAllProblems,
  },
};
</script>

<style scoped></style>
