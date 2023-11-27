<template>
  <b-container>
    <b-row>
      <b-col></b-col>
      <b-col cols="6">
        <b-card title="Categoría">
          <b-form @submit="nuevaCategoria">
            <b-form-group label="Nombre">
              <b-form-input v-model="nombre" placeholder="Captura el nombre de tu categoria" required></b-form-input>
            </b-form-group>
            <br>
            <b-form-group label="Descripción">
              <b-form-input v-model="desc" placeholder="Captura la descripción de tu categoria" required></b-form-input>
            </b-form-group>
            <br>
            <b-form-group label="Imagen">
              <b-form-input v-model="image" placeholder="Ingresa el link de la imagen" required></b-form-input>
            </b-form-group>
            <br>
            <b-button type="submit" variant="primary">Crear Categoria</b-button>
            <br>
            <button class="btn btn-danger" @click="goToListCategories">Lista de Categorias</button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-modal ref="myModalRef" title="Categoria Nueva">
      <p>Categoria creada correctamente!</p>
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
      nombre:"",
      desc:"",
      image:""
    }
  },
  methods: {
    async nuevaCategoria(event){
      event.preventDefault();
      const tokenAutenticacion = localStorage.getItem("jwt");
      const requestBody = {
        name: this.nombre,
        description: this.desc,
        image: this.image
      }
      const serverUrl = "https://kind-lime-meerkat-gear.cyclic.app/";

      try {
        const response = await axios.post(`${serverUrl}category/`, requestBody, {
          headers: {
            Authorization: `Bearer ${tokenAutenticacion}`
          }
        });
        
        // Show modal on success
        if (response.status === 200) {
          this.$refs.myModalRef.show();
          // Clear form fields after a delay (you can adjust the delay as needed)
          setTimeout(() => {
            this.nombre = '';
            this.desc = '';
            this.image = '';
          }, 2000);
        }
      } catch (error) {
        console.error('Error creating category: ', error);
      }
         
      },
      goToListCategories() {
      this.$router.push({ name: 'ListaCategorias' });
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
