<template>
  <div :class="state">
    <h2 class="title">{{ problem.Title }}</h2>
    <br />
    <h3>Description</h3>
    <br />
    <span v-html="problem.Description"></span>
    <br />
    <h3>Code</h3>
    <br />
    <textarea v-model="problem.Code" @keydown.tab.prevent> </textarea>
  </div>
</template>


<script>
import DBService from "@/core/dbservice";

export default {
  name: "Problem",
  props: { ID: String },
  data() {
    DBService.getProblem(this.ID).then((docSnap) => {
      this.problem = docSnap.data();
      this.state = "";
    });
    return {
      state: "loading",
      problem: {},
    };
  },
};
</script>


<style scoped >
textarea {
  background-color: #f4f4f4;
  display: block;
  padding: 10px;
  border-radius: 10px;
  width: calc(100% - 20px);
  height: 100px;
}
.loading {
  opacity: 0;
}
div {
  transition: 1s;
}
</style>
