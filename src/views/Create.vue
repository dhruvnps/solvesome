<template>
  <div>
    <form @submit.prevent="submit">
      <textarea class="title" v-model="title" placeholder="Title..." required />
      <textarea
        class="description"
        v-model="description"
        placeholder="Description..."
        required
      />
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
  components: {},
  data() {
    return {
      title: "",
      description: "",
      user: computed(() => store.getters.getUser),
    };
  },
  methods: {
    async submit() {
      var problem = new Problem(this.title, this.description, this.user.uid);
      await DBService.createProblem(problem);
      router.push("/problem/" + problem.id);
    },
  },
};
</script>

<style scoped>
h3 {
  font-weight: lighter;
}
input {
  margin-right: 5px;
  margin-bottom: 10px;
}
form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
input,
textarea {
  font-family: inherit;
  color: var(--primary);
}
.title {
  height: 1.5em;
  font-size: x-large;
  border-width: 0 0 1px;
}
.description {
  border-width: 1px;
  height: 100px;
  font-size: medium;
}
textarea,
input {
  padding: 5px;
}
textarea {
  transition: 0.5s;
  width: calc(100% - 12px);
  border-color: lightgray;
  outline: 0;
  margin-bottom: 30px;
  margin-top: 10px;
}
textarea:hover {
  border-color: var(--primary);
}
.submit {
  width: min-content;
  text-align: left;
}
</style>
