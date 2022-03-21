<template>
  <div class="profile">
    <List
      title="Problems Created"
      :problemGetter="getUserCreatedProblems"
      :showCreateButton="true"
    />
    <br />
    <br />
    <List
      title="Solutions Attempted"
      :problemGetter="getUserAttemptedProblems"
      :showCreateButton="false"
    />
  </div>
</template>

<script>
import List from "@/components/List.vue";
import DBService from "@/core/dbservice";

export default {
  name: "Profile",
  components: {
    List,
  },
  methods: {
    getUserCreatedProblems: DBService.getUserCreatedProblems,
    getUserAttemptedProblems: DBService.getUserAttemptedProblems,
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
}
</style>
