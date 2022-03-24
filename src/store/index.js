import { createStore } from 'vuex'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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
        .replace(/[\W_]+/g, " ")
        .replace('auth', '');
    }
  },
  actions: {
    async signupAction({ commit }, payload) {
      try {
        await createUserWithEmailAndPassword(auth, payload.email, payload.password);
        router.push("/");
        var user = new User(payload.name, auth.currentUser.uid);
        commit("setUser", user);
        DBService.createUser(user);
      } catch (err) {
        console.log(err);
        commit("setError", err.message);
      }
    },
    async loginAction({ commit }, payload) {
      try {
        await signInWithEmailAndPassword(auth, payload.email, payload.password);
        router.push("/");
        var user = await DBService.getUser(auth.currentUser.uid);
        commit("setUser", user);
      } catch (err) {
        commit("setError", err.message);
      }
    },
    async logoutAction({ commit }) {
      await signOut(auth);
      router.push("/login");
      commit("setUser", null);
    },
    async authAction({ commit }) {
      await auth.onAuthStateChanged(async function (authUser) {
        if (authUser) {
          var user = await DBService.getUser(authUser.uid);
          commit("setUser", user);
        } else {
          commit("setUser", null);
        }
      });
    }
  },
})