<template>
  <div>
    
     Vista de Categoria
    
  </div>
</template>

<script>
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

      const response = await axios.post(
        `${serveUrl}users/login`,
        requestBody
      );

      console.log(response)
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