import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

import mitt from 'mitt';

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrxMLiQI2ATGzx6K1amfysMKsMcBmgovg",
    authDomain: "friendlysport-db70e.firebaseapp.com",
    projectId: "friendlysport-db70e",
    storageBucket: "friendlysport-db70e.appspot.com",
    messagingSenderId: "246244637545",
    appId: "1:246244637545:web:44903de861074f3d215bf8"
};
// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);


const app = createApp(App)

export const emitter = mitt();
app.config.globalProperties.emitter = emitter;

app.use(router)

app.mount('#app')
