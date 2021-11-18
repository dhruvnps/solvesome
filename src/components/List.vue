<template>
  <div class="list" :class="state">
    <div v-for="item in items" :key="item" class="item">
      <span class="title">{{ item.problem.Title }}</span>
      <span class="user">Posted by {{ item.user.Name }}</span>
    </div>
  </div>
</template>

<script>
import DBService from "../dbservice";

export default {
  name: "Listitem",
  data() {
    DBService.getProblems().then((col) => {
      col.docs.forEach((doc) => {
        const problem = doc.data();
        DBService.getUser(problem.UID).then((docSnap) => {
          this.items.push({
            problem: problem,
            user: docSnap.data(),
          });
        });
      });
      this.state = "";
    });
    return {
      state: "loading",
      items: [],
    };
  },
};
</script>

<style scoped>
.loading {
  opacity: 0;
}
div.list {
  transition: 1000ms;
}
div.item {
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 0;
}
.title {
  font-size: x-large;
  padding-top: 10px;
}
.user {
  font-size: small;
  font-weight: bold;
  padding-bottom: 10px;
}
</style>
