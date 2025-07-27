import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import Galleria from "primevue/galleria";

import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "./assets/styles/main.css";
const app = createApp(App);
app.use(PrimeVue);
app.component("Galleria", Galleria);
app.mount("#app");
