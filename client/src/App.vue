
<template>
  <form v-on:submit.prevent="login(form)">
    <div v-if="authenticated">
    hey {{ user.name }} <br>
    <button v-on:click="logout">Logout</button> 
    </div>
    <!-- {{ form }} -->
    <label for="email">Email : </label>
    <input type="text" id="email" name="email" v-model="form.email"> <br>
    <div v-if="errors.email">{{ errors.email[0] }}</div>
    <br>
    <label for="password">Password :  </label>
    <input type="password" id="password" name="password" v-model="form.password"> <br>
    <br>
    <div v-if="errors.password">{{ errors.password[0] }}</div>
    <button>Submit</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import useAuth from './auth/useAuth'

const { login , getAuthencticated:authenticated, getUser:user , errors , logout } = useAuth()
const form = reactive({

email:'',
password:''

})


     

</script>
