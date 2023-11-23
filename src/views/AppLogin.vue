<template>
  <div>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-card title="Login">
          <b-form @submit="login">


            <b-form-group label="Username">
              <b-form-input v-model="username" placeholder="Enter your username" required></b-form-input>
            </b-form-group>

            <b-form-group label="Password">
              <b-form-input v-model="pass" type="password" placeholder="Enter your password" required></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Login</b-button>
          </b-form>
          <router-link to = "register">Registro</router-link>
        </b-card>

        </b-col>
        <b-col></b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      username: "",
      pass: ""
    }
  },
  methods: {
    async login(event) {
      event.preventDefault();
      const requestBody = {
        usrn: this.username,
        password: this.pass
      }

      const serveUrl = "https://kind-lime-meerkat-gear.cyclic.app/";


  try{
      const response = await axios.post(
        `${serveUrl}users/login`,
        requestBody
      );

      console.log(response)
      if (response && response.data && response.data.jwt){
        localStorage.setItem("jwt",response.data.jwt);
        router.push({name:"Dashboard"})
      }else{
        alert("Login Erroneo");
      }  
    }catch(err){
      alert("Login Erroneo");
    }
  }
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>