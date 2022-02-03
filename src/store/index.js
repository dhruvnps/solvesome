import { createStore } from 'vuex'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
import DBService from "@/core/dbservice";
import { User } from "@/core/user";
import router from '@/router'

export const store = createStore({
  state: {
    user: null,
    error: "",
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isUserAuth(state) {
      return !!state.user;
    },
    getError(state) {
      return state.error;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = /\(([^)]+)\)/
        .exec(payload)[0]
        .replace(/[\W_]+/g, " ");
    }
  },
  actions: {
    async signupAction({ commit }, payload) {
      try {
        await createUserWithEmailAndPassword(auth, payload.email, payload.password);
        var user = User(payload.name, auth.currentUser.uid);
        await DBService.createUser(user);
        commit("setUser", user);
        router.push("/");
      } catch (err) {
        commit("setError", err.message);
      }
    },
    async loginAction({ commit }, payload) {
      try {
        await signInWithEmailAndPassword(auth, payload.email, payload.password);
        var user = DBService.getUser(auth.currentUser.uid)
        commit("setUser", user);
        router.push("/");
      } catch (err) {
        commit("setError", err.message);
      }
    },
    async authAction({ commit }) {
      await auth.onAuthStateChanged(async function (authUser) {
        if (authUser) {
          var user = await DBService.getUser(authUser.uid)
          commit("setUser", user)
        } else {
          commit("setUser", null);
        }
      });
      console.log(this.state);
    }
  },
})