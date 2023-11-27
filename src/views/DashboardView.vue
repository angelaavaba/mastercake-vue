<template>
  <div>
    <b-sidebar visible id="sidebar-1" title="Sidebar" shadow>
     Ventanas de catalogos
     <br> 
     <router-link :to="{name: 'CatalogoCategorias'}">Catalogo de Categorias</router-link>
     <br>
     <router-link :to="{name: 'CatalogoProductos'}">Catalogo de Productos</router-link>
     <br>
     <router-link :to="{name: 'ListaProductos'}">Lista de Productos</router-link>
     <br>
     <router-link :to="{name: 'ListaCategorias'}">Lista de Productos</router-link>
    </b-sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "App",
    data() {
        return {
            username: "",
            pass: ""
        };
    },
    methods: {
        async login(event) {
            event.preventDefault();
            const requestBody = {
                usrn: this.username,
                password: this.pass
            };
            const serveUrl = "https://kind-lime-meerkat-gear.cyclic.app/";
            const response = await axios.post(`${serveUrl}users/login`, requestBody);
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