import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import useAuth from "./auth/useAuth";

const {attempt} = useAuth()

axios.defaults.baseURL="http://localhost:8000"
axios.defaults.withCredentials=true

attempt().then(()=>{
    createApp(App).mount('#app')
})
