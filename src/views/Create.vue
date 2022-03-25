<template>
  <div>
    <form @submit.prevent="submit">
      <!-- required problem title input -->
      <input class="title" v-model="title" placeholder="Title" required />
      <br />
      <h3>Description</h3>
      <br />
      <!-- required problem description input -->
      <textarea
        class="description"
        v-model="description"
        placeholder=""
        required
      />
      <br />
      <h3>Test Cases</h3>
      <br />
      <!-- iterate over test cases -->
      <div class="tests" v-for="(test, index) in inputTests" :key="test">
        <span>{{ index + 1 }}. </span>
        <!-- show test case input/output fields -->
        <input v-model="test.input" placeholder="Input" required />
        <input v-model="test.output" placeholder="Output" required />
        <!-- delete button removes test from tests array -->
        <!-- button only shown if more that one test case -->
        <input
          v-if="inputTests.length > 1"
          type="button"
          value="Delete"
          @click="inputTests.splice(index, 1)"
        />
      </div>
      <div>
        <!-- add test button pushes empty test to tests array -->
        <span class="addTest" @click="inputTests.push({})"> + Add Test </span>
      </div>
      <br />
      <!-- submit button calls submit method if fields inputted -->
      <input type="submit" class="submit" value="Create Problem" />
    </form>
  </div>
</template>

<script>
import { store } from "@/store";
import { computed } from "vue";
import DBService from "@/core/dbservice";
import { NewProblem } from "@/core/problem";
import router from "@/router";

export default {
  name: "Create",
  data() {
    return {
      // assign default values to data properties
      title: "",
      description: "",
      inputTests: [{}],
      // get current user object from store
      user: computed(() => store.getters.getUser),
    };
  },
  methods: {
    // invoked when submit button is clicked
    async submit() {
      // creates new problem project using inherited class
      var problem = new NewProblem(
        // pass data properties
        this.title,
        this.description,
        this.user.uid
      );
      // add problem test cases
      for (var test of this.inputTests) {
        await problem.addTest(test.input, test.output);
      }
      // push problem to database via database service
      await DBService.createProblem(problem);
      // load problem page on browser
      router.push("/problem/" + problem.id);
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
textarea,
input {
  font-family: inherit;
  color: var(--primary);
}
.title {
  height: 1.5em;
  font-size: x-large;
  font-weight: 500;
  border-width: 0 0 1px;
}
.description {
  border-width: 1px;
  height: 100px;
  font-size: medium;
}
.description,
.title {
  padding: 0px;
  width: 100%;
  border-color: lightgray;
}
.submit {
  width: min-content;
  text-align: left;
  padding: 10px;
}
.tests input {
  margin-right: 5px;
  margin-bottom: 5px;
}
.addTest {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: small;
  font-weight: bold;
  cursor: pointer;
}
</style>
