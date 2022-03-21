<template>
  <div>
    <form @submit.prevent="submit">
      <input class="title" v-model="title" placeholder="Title" required />
      <br />
      <h3>Description</h3>
      <br />
      <textarea
        class="description"
        v-model="description"
        placeholder=""
        required
      />
      <br />
      <h3>Test Cases</h3>
      <br />
      <div class="tests" v-for="(test, index) in inputTests" :key="test">
        <span>{{ index + 1 }}. </span>
        <input v-model="test.input" placeholder="Input" required />
        <input v-model="test.output" placeholder="Output" required />
        <input
          v-if="inputTests.length > 1"
          type="button"
          value="Delete"
          @click="inputTests.splice(index, 1)"
        />
      </div>
      <div>
        <span class="addTest" @click="inputTests.push({})">+ Add Test</span>
      </div>
      <br />
      <input type="submit" class="submit" value="Create Problem" />
    </form>
  </div>
</template>

<script>
import { store } from "@/store";
import { computed } from "vue";
import DBService from "@/core/dbservice";
import { Problem } from "@/core/problem";
import router from "@/router";

export default {
  name: "Create",
  data() {
    return {
      title: "",
      description: "",
      inputTests: [{}],
      user: computed(() => store.getters.getUser),
    };
  },
  methods: {
    async submit() {
      var problem = new Problem(this.title, this.description, this.user.uid);
      for (var test of this.inputTests) {
        await problem.addTest(test.input, test.output);
      }
      await DBService.createProblem(problem);
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
