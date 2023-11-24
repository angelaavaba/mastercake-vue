<template>
  <b-container>
    <b-row>
      <b-col></b-col>
      <b-col cols="6">
        <b-card title="Categoría">
          <b-form @submit="nuevaCategoria">
            <b-form-group
                label="Nombre de la Categoria"
            >
              <b-form-input
                  v-model="nombre"
                  placeholder="Captura el nombre de tu categoria"
                  required
              ></b-form-input>
            </b-form-group>
            <br>
            <b-form-group
                label="Descripcion"
            >
              <b-form-input
                  v-model="desc"
                  placeholder="Captura tu descripcion"
                  required
              ></b-form-input>
            </b-form-group>
            <br>
            <b-button type="submit" variant="primary">Crear Categoria</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      nombre:"",
      desc:""
    }
  },
  methods: {
    async nuevaCategoria(event){
      event.preventDefault();
      const tokenAutenticacion = localStorage.getItem("jwt");
      const requestBody = {
        name: this.nombre,
        description: this.desc
      }
      const serverUrl = "https://kind-lime-meerkat-gear.cyclic.app/";

      const response = await axios.post(
          `${serverUrl}category/`,
          requestBody,
          {
            headers: {
              'Authorization': `Barer ${tokenAutenticacion}`
            } 
          }
      );
      console.log(response);
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
