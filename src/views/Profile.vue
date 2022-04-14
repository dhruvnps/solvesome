<template>
  <!-- embed two list components and pass problem getter -->
  <div class="profile">
    <!-- 1st list component is for problems created by user -->
    <List
      title="Problems Created"
      :problemGetter="getUserCreatedProblems"
      :showCreateButton="true"
    />
    <br />
    <br />
    <!-- 2nd list component is for problems attempted by user -->
    <List
      title="Problems Attempted"
      :problemGetter="getUserAttemptedProblems"
      :showCreateButton="false"
    />
    <br />
    <br />
    <!-- 3rd list component is for problems solved by user -->
    <List
      title="Problems Solved"
      :problemGetter="getUserSolvedProblems"
      :showCreateButton="false"
    />
  </div>
</template>

<script>
import List from "@/components/List.vue";
import DBService from "@/core/dbservice";

export default {
  name: "Profile",
  components: { List },
  methods: {
    // pass get user created problems method to 1st list
    getUserCreatedProblems: DBService.getUserCreatedProblems,
    // pass get user attempted problems method to 2nd list
    getUserAttemptedProblems: DBService.getUserAttemptedProblems,
    // pass get user solved problems method to 3rd list
    getUserSolvedProblems: DBService.getUserSolvedProblems,
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
}
</style>
