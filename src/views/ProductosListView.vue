<template>
    <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="mb-0">Lista de Productos</h2>
      <button class="btn btn-primary" @click="goToCategories">Crear Producto</button>
    </div>
      <table class="table table-bordered table-hover">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Imagen</th>
            <th scope="col">Producto</th>
            <th scope="col">Descripción</th>
            <th scope="col">Categoría</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product._id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ product.image}}</td>
            <td>{{ product.product }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price }}</td>
            <td>
                <button class="btn btn-danger btn-sm" v-on:click="deleteProduct(product._id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProductsListView',
    data() {
      return {
        products: []
      }
    },
    async created() {
      await this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
        try {
          const tokenAutenticacion = localStorage.getItem("jwt");
          const serverUrl = "https://kind-lime-meerkat-gear.cyclic.app/";
          const response = await axios.get(`${serverUrl}products/`, {
            headers: {
              'Authorization': `Bearer ${tokenAutenticacion}`
            }
          });
          this.products = response.data;
        } catch (error) {
          console.error("Error al obtener los productos: ", error);
        }
      },
      
      async deleteProduct(idProduct) {
        const tokenAutenticacion = localStorage.getItem("jwt");
        const serverURL = "https://kind-lime-meerkat-gear.cyclic.app/";

        try {
         await axios.delete(`${serverURL}products/${idProduct}`, {
            headers: {
                'Authorization': `Bearer ${tokenAutenticacion}`
            }
            });
            this.fetchProducts();
        } catch (error) {
          console.error("Error al eliminar el producto", error);
        }
      },

      goToCategories() {
      this.$router.push({ name: 'CatalogoCategorias' });
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
  
.table {
  background-color: #f8f9fa; /* Color de fondo claro */
}

.thead-dark th {
  background-color: #343a40; /* Cabezera oscura */
  color: white;
}
  </style>