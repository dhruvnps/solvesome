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
    <textarea v-model="code.codeBlock" @keydown.tab.prevent> </textarea>
    <div class="panel">
      <span class="button" @click="del">Delete</span>
      <span class="button" @click="saveRun">Save/Run</span>
      <span class="button" @click="submit">Submit</span>
      <span class="divider">|</span>
      <span class="output">{{ output }}</span>
    </div>
  </div>
</template>


<script>
import { store } from "@/store";
import { computed } from "vue";
import DBService from "@/core/dbservice";

export default {
  name: "Problem",
  props: { ID: String },
  data() {
    DBService.getProblem(this.ID).then((problem) => {
      DBService.getUserProblemCode(store.state.user.uid, problem.id).then(
        (code) => {
          this.problem = problem;
          this.code = code;
          this.state = "";
        }
      );
    });
    return {
      state: "loading",
      problem: {},
      code: {},
      output: "",
      user: computed(() => store.getters.getUser),
    };
  },
  methods: {
    async del() {
      this.code.resetCode();
      this.output = "";
      await DBService.updateCode(this.code);
    },
    async saveRun() {
      var score = this.code.testCode(this.problem.tests);
      this.output = score + " Tests Passed!";
      await DBService.updateCode(this.code);
    },
    async submit() {
      if (!this.code.submitCode(this.problem.tests)) {
        this.output = "Incorrect Solution";
      } else {
        // correct solution
      }
      await DBService.updateCode(this.code);
    },
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
.description {
  white-space: pre-wrap;
}
.panel {
  margin-top: 5px;
}
.button {
  margin-right: 15px;
  font-weight: bold;
  cursor: pointer;
}
.output {
  color: red;
  margin-left: 15px;
}
.divider {
  font-size: x-large;
  font-weight: 100;
}
div {
  transition: 1s;
}
.loading {
  opacity: 0;
}
</style>
