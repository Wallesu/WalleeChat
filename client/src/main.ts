import { createApp } from 'vue'

import App from "./App.vue";
import router from "./router";

import "./assets/css/main.css";
import 'boxicons'

const app = createApp(App);

import TextInput from './components/TextInput.vue'
import TextArea from './components/global/TextArea.vue'
import EmojiPicker from './components/global/EmojiPicker.vue'
app.component('TextInput', TextInput)
app.component('TextArea', TextArea)
app.component('EmojiPicker', EmojiPicker)


import { createPinia } from "pinia";
app.use(createPinia());
app.use(router);

app.mount("#app");
