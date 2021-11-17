<template>
  <div class="item" :class="state">
    <span class="title">{{ data.Title }}</span>
    <span class="user">Posted by {{ user.Name }}</span>
  </div>
</template>

<script>
import DBService from "../dbservice";

export default {
  name: "Listitem",
  props: { ID: String },
  data() {
    DBService.getProblem(this.ID).then((docSnap) => {
      this.data = docSnap.data();
      DBService.getUser(this.data.UID).then((docSnap) => {
        this.user = docSnap.data();
        this.state = "";
      });
    });
    return {
      state: "loading",
      data: {},
      user: {},
    };
  },
};
</script>

<style scoped>
.loading {
  opacity: 0;
}
div.item {
  transition: 1000ms;
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
