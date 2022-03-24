<template>
  <div :class="state">
    <div class="heading">
      <h2 class="title">{{ problem.title }}</h2>
      <span class="author">by {{ creator.name }}</span>
    </div>
    <br />
    <h3>Description</h3>
    <br />
    <span class="description"> {{ problem.description }}</span>
    <br />
    <br />
    <div v-if="!showSolved">
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
    <div v-if="showSolved">
      <h3>Submitted Solutions</h3>
      <span class="noSolutions" v-if="!submittedCodes.length">
        No solutions submitted yet!
      </span>
      <br />
      <div v-for="code of submittedCodes" v-bind:key="code">
        <textarea
          :class="code.uid === user.uid ? 'fill' : ''"
          v-model="code.codeBlock"
          readonly
          class="submittedCode"
        ></textarea>
      </div>
    </div>
  </div>
</template>


<script>
import { store } from "@/store";
import { computed } from "vue";
import DBService from "@/core/dbservice";
import router from "@/router";

export default {
  name: "Problem",
  props: { id: String },
  data() {
    DBService.getProblem(this.id).then((problem) =>
      DBService.getUser(problem.uid).then((creator) =>
        DBService.getSubmittedProblemCodes(problem.id).then((submittedCodes) =>
          DBService.getUserProblemCode(store.getters.getUser.uid, this.id).then(
            (code) => {
              this.problem = problem;
              this.code = code;
              this.creator = creator;
              if (code.uid === creator.uid) {
                this.showSolved = true;
              } else {
                this.showSolved = code.isSubmitted;
              }
              this.submittedCodes = submittedCodes;
              this.state = "";
            }
          )
        )
      )
    );
    return {
      state: "loading",
      problem: {},
      code: {},
      output: "",
      creator: {},
      showSolved: false,
      submittedCodes: [],
      user: computed(() => store.getters.getUser),
    };
  },
  methods: {
    async del() {
      this.output = "";
      this.code.resetCode();
      await DBService.updateCode(this.code);
    },
    async saveRun() {
      this.output = "Testing...";
      await DBService.updateCode(this.code);
      var score = await this.code.testCode(this.problem.tests);
      this.output = score + " Tests Passed!";
    },
    async submit() {
      this.output = "Testing...";
      await DBService.updateCode(this.code);
      var success = await this.code.submitCode(this.problem.tests);
      await DBService.updateCode(this.code);
      if (success) {
        this.output = "Submitting...";
        router.go();
      } else {
        this.output = "Incorrect Solution";
      }
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
.submittedCode {
  margin-bottom: 10px;
}
.submittedCode:not(.fill) {
  background-color: #ffffff;
}
.noSolutions {
  color: red;
  font-weight: 100;
}
.heading {
  display: flex;
  flex-direction: column;
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
  pointer-events: none;
}
</style>
