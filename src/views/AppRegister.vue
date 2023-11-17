<template>
  <div>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-card title="Register">
          <b-form @submit="register">


            <b-form-group label="Username">
              <b-form-input v-model="username" placeholder="Enter your username" required></b-form-input>
            </b-form-group>

            <b-form-group label="Password">
              <b-form-input v-model="pass" type="password" placeholder="Enter your password" required></b-form-input>
            </b-form-group>

            <b-form-group label="Birthdate">
              <b-form-input v-model="birthdate" type="date" placeholder="Enter your birthdate"></b-form-input>
            </b-form-group>

            <b-form-group label="Address">
              <b-form-input v-model="address" placeholder="Enter your address"></b-form-input>
            </b-form-group>
            
            <b-form-group label="Gender">
              <b-form-input v-model="gender" placeholder="Enter your gender (Masculino, Femenino, Other)"></b-form-input>
            </b-form-group>


            <b-button type="submit" variant="primary">Register</b-button>
          </b-form>
          <router-link to = "/">Login</router-link>
        </b-card>

        </b-col>
        <b-col></b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name:'App',
  components: {

  },
  data(){
    return{
      username: "",
      pass: "",
      birthdate: "",
      address: "",
      gender: ""
    }
  },
  methods:{
    async register(event){
      event.preventDefault();
      const requestBody = {
        usrn: this.username,
        password: this.pass,
        fechaNacimiento: this.birthdate,
        domicilio: this.address,
        sexo: this.gender
      }

      const serveUrl = "https://kind-lime-meerkat-gear.cyclic.app/";

      const response = await axios.post(
        `${serveUrl}users/registrar`,
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
