<template>
  <div class="list" :class="state">
    <div v-for="item in items" :key="item">
      <div class="item">
        <router-link :to="'/problem/' + item.problem.id" class="link">
          <span class="title">{{ item.problem.Title }}</span>
          <div class="userblock">
            <span class="user">Posted by {{ item.user.Name }}</span>
          </div>
        </router-link>
        <hr />
      </div>
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
        problem.id = doc.id;
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
  transition: 1s;
}
div.item {
  padding-bottom: 20px;
}
.link {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.title {
  font-size: x-large;
  font-weight: lighter;
}
.user {
  font-size: small;
}
.userblock {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
hr {
  border: 0;
  border-top: 1px solid var(--primary);
  margin: 0;
  opacity: 0.1;
}
</style>
