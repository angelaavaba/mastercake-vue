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
              <b-form-select v-model="selectedCategoryId" :options="categoryOptions" required placeholder="Seleccione una categoría">
            </b-form-select>
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
            <b-form-group label="Imagen">
              <b-form-input v-model="img" placeholder="Ingresa el link de la imagen" required></b-form-input>
            </b-form-group>
            <br>
            <b-button type="submit" variant="primary">Crear Producto</b-button>
            <br>
            <button class="btn btn-danger" @click="goToListProducts">Lista de Productos</button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-modal ref="myModalRef" title="Producto Nuevo">
      <p>Producto creado correctamente!</p>
    </b-modal>
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
        pre:"",
        desc:"",
        img:"",
        categories: [], 
        selectedCategoryId: ''
      }
    },
    created(){
      this.fetchCategories();
    },
    methods: {
      async nuevoProducto(event){
        event.preventDefault();
        const tokenAutenticacion = localStorage.getItem("jwt");
        const requestBody = {

          product:this.prod,
          category:this.selectedCategoryId,
          price:this.pre,
          description: this.desc,
          image: this.img

        }
        const serverUrl = "https://kind-lime-meerkat-gear.cyclic.app/";
  
        try {
        const response = await axios.post(`${serverUrl}products/`, requestBody, {
          headers: {
            Authorization: `Bearer ${tokenAutenticacion}`
          }
        });
        
        // Show modal on success
        if (response.status === 200) {
          this.$refs.myModalRef.show();
          // Clear form fields after a delay (you can adjust the delay as needed)
          setTimeout(() => {
            this.prod = '';
            this.cate = '';
            this.pre = '';
            this.desc = '';
            this.img = '';
          }, 2000);
        }
      } catch (error) {
        console.error('Error creating product: ', error);
      }
         
      },
      goToListProducts() {
      this.$router.push({ name: 'ListaProductos' });
      },
      
      async fetchCategories() {
  try {
    const tokenAutenticacion = localStorage.getItem("jwt");
    const response = await axios.get('https://kind-lime-meerkat-gear.cyclic.app/category', {
      headers: {
        Authorization: `Bearer ${tokenAutenticacion}`
      }
    });
    this.categories = response.data;
  } catch (error) {
    console.error('Error fetching categories: ', error);
  }
}
    },

    computed: {
      categoryOptions() {
      return this.categories.map(category => ({
      value: category._id, 
      text: category.name
    }));
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
  