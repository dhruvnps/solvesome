<template>
  <div :class="state">
    <!-- display problem title and creator name in header -->
    <div class="heading">
      <h2 class="title">{{ problem.title }}</h2>
      <span class="author">by {{ creator.name }}</span>
    </div>
    <br />
    <h3>Description</h3>
    <br />
    <!-- display problem description -->
    <span class="description"> {{ problem.description }}</span>
    <br />
    <br />
    <!-- input code block and code action buttons -->
    <!-- displayed if user has not solved the problem -->
    <div v-if="!showSolved">
      <h3>Code</h3>
      <br />
      <!-- editable code block -->
      <textarea v-model="code.codeBlock" @keydown.tab.prevent />
      <!-- code action buttons which invoke methods -->
      <div class="panel">
        <!-- input buttons -->
        <span class="button" @click="del">Delete</span>
        <span class="button" @click="saveRun">Save/Run</span>
        <span class="button" @click="submit">Submit</span>
        <span class="divider">|</span>
        <!-- output text -->
        <span class="output">{{ output }}</span>
      </div>
    </div>
    <!-- submitted solutions -->
    <!-- only displayed if user creator or has solved problem -->
    <div v-if="showSolved">
      <h3>Submitted Solutions</h3>
      <!-- display message if no solutions submitted yet -->
      <span class="noSolutions" v-if="!submittedCodes.length">
        No solutions submitted yet!
      </span>
      <br />
      <!-- iterate over submitted solution code objects -->
      <div v-for="code of submittedCodes" v-bind:key="code">
        <!-- show solution code block -->
        <!-- fill grey if it is the current user's solution -->
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
import CodeSort from "@/core/codesort";
import router from "@/router";

export default {
  name: "Problem",
  // id of problem is passed to the url of the page
  props: { id: String },
  data() {
    return {
      // set state to loading to hide list items
      state: "loading",
      // initialize data properties as default values
      problem: {},
      code: {},
      output: "",
      creator: {},
      showSolved: false,
      submittedCodes: [],
      // get current user object from store
      user: computed(() => store.getters.getUser),
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    // get data from database via database service
    async getData() {
      // get problem object corresponding to url of problem page
      this.problem = await DBService.getProblem(this.id);
      // get problem creator user object
      this.creator = await DBService.getUser(this.problem.uid);
      // get list of code objects with submitted problem solutions
      this.submittedCodes = await DBService.getSubmittedProblemCodes(this.id);
      // get code object of user's code on the current problem
      this.code = await DBService.getUserProblemCode(
        store.getters.getUser.uid,
        this.id
      );

      // shows solutions if user is creator or has solved problem
      this.showSolved =
        this.code.uid === this.creator.uid ? true : this.code.isSubmitted;

      // sort solution submissions using merge sort implementation
      this.submittedCodes = CodeSort.mergeSort(this.submittedCodes);

      // removing loading from state to display list items
      this.state = "";
    },

    // invoked when delete button clicked
    async del() {
      this.output = "";
      // delete user code
      this.code.resetCode();
      // update database
      await DBService.updateCode(this.code);
    },
    // invoked when save/run button clicked
    async saveRun() {
      this.output = "Testing...";
      // update database
      await DBService.updateCode(this.code);
      // test user's code
      var score = await this.code.testCode(this.problem.tests);
      // output score
      this.output = score + " Tests Passed!";
    },
    // invoked when submit button pressed
    async submit() {
      this.output = "Testing...";
      // update database
      await DBService.updateCode(this.code);
      // mark code a submitted if it is correct
      var success = await this.code.submitCode(this.problem.tests);
      // update database
      await DBService.updateCode(this.code);
      // display appropriate message to output
      if (success) {
        this.output = "Submitting...";
        // reload page
        router.go();
      } else {
        this.output = "Incorrect Solution";
      }
    },
  },
};
</script>

<style scoped>
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
