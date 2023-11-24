<template>
  <b-container>
    <b-row>
      <b-col></b-col>
      <b-col cols="6">
        <b-card title="Productos">
          <b-form @submit="nuevoProducto">
            <b-form-group label="Nombre">
              <b-form-input v-model="prod" placeholder="Captura el nombre de tu producto" required></b-form-input>
            </b-form-group>
            <br>
            <b-form-group label="Categoría">
              <b-form-input v-model="cate" placeholder="Captura la categoría de tu producto" required></b-form-input>
            </b-form-group>
            <br>
            <b-form-group label="Precio">
              <b-form-input v-model="pre" type="number" placeholder="Ingresa el precio de tu producto" required></b-form-input>
            </b-form-group>
            <br>
            <b-form-group label="Descripción">
              <b-form-input v-model="desc" placeholder="Captura la descripción de tu producto" required></b-form-input>
            </b-form-group>
            <br>
            <b-button type="submit" variant="primary">Crear Producto</b-button>
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
        prod:"",
        cate:"",
        pre:"",
        desc:""
      }
    },
    methods: {
      async nuevoProducto(event){
        event.preventDefault();
        const tokenAutenticacion = localStorage.getItem("jwt");
        const requestBody = {

          product:this.prod,
          category:this.cate,
          price:this.pre,
          description: this.desc

        }
        const serverUrl = "https://kind-lime-meerkat-gear.cyclic.app/";
  
        const response = await axios.post(
            `${serverUrl}products/`,
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
  