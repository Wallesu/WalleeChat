import { createApp } from 'vue'

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import 'boxicons'

const app = createApp(App);

import TextInput from './components/TextInput.vue'
app.component('TextInput', TextInput)


import { createPinia } from "pinia";
app.use(createPinia());
app.use(router);

app.mount("#app");
