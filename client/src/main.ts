import { createApp } from 'vue'

import App from "./App.vue";
import router from "./router";

import "./assets/css/main.css";
import 'boxicons'

const app = createApp(App);

import axios from './utils/httpRequest.js'
app.config.globalProperties.$axios = axios as AxiosInstance

import TextInput from './components/TextInput.vue'
import TextArea from './components/global/TextArea.vue'
import EmojiPicker from './components/global/EmojiPicker.vue'
app.component('TextInput', TextInput)
app.component('TextArea', TextArea)
app.component('EmojiPicker', EmojiPicker)


import { createPinia } from "pinia";
import type { AxiosInstance } from 'axios';
app.use(createPinia());
app.use(router);

app.mount("#app");
