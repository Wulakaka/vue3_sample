import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./utils/refreshRootFontSize";

createApp(App).use(router).mount("#app");
