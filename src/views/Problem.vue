<template>
  <div :class="state">
    <h2 class="title">{{ problem.title }}</h2>
    <br />
    <h3>Description</h3>
    <br />
    <span class="description"> {{ problem.description }}</span>
    <br />
    <br />
    <h3>Code</h3>
    <br />
    <textarea @keydown.tab.prevent> </textarea>
  </div>
</template>


<script>
import DBService from "@/core/dbservice";

export default {
  name: "Problem",
  props: { ID: String },
  data() {
    DBService.getProblem(this.ID).then((problem) => {
      this.problem = problem;
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
  color: var(--primary);
}
.loading {
  opacity: 0;
}
div {
  transition: 1s;
}
</style>
