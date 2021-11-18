import { createApp } from 'vue';
import App from './App.vue';
import { initializeApp } from 'firebase/app'
import router from './router'

initializeApp({
    apiKey: "AIzaSyAsHZmRujTLyQUalsdTm-AxAY_PWazvrLI",
    authDomain: "solvesome.firebaseapp.com",
    projectId: "solvesome",
    storageBucket: "solvesome.appspot.com",
    messagingSenderId: "1042004317268",
    appId: "1:1042004317268:web:492fd722d82a14551c49c1"
});

createApp(App).use(router).mount('#app');