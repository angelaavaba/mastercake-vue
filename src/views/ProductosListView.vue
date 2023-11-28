<template>
     <div class="container my-4">
      <div class="menu-container">
      <b-nav>
        <b-nav-item-dropdown text="Perfil" right>
          <b-dropdown-item @click="logout">Cerrar Sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>
    </div>
    <div class="text-center mb-4">
      <h2 class="d-inline-block border-bottom pb-2 text-white">Lista de Productos</h2>
      <br>
    </div>
    <div class="table-responsive" v-if="products.length > 0">
      <table class="table table-bordered table-hover rounded-lg">
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
      <td>
        <img :src="product.image" alt="Product Image" style="max-width: 100px; max-height: 100px;" />
      </td>
      <td v-if="!product.editing">{{ product.product }}</td>
      <td v-if="product.editing">
        <b-form-input v-model="product.product" />
      </td>
      <td v-if="!product.editing">{{ product.description }}</td>
      <td v-if="product.editing">
        <b-form-input v-model="product.description" />
      </td>
      <td v-if="!product.editing">{{ product.category }}</td>
      <td v-if="product.editing">
        <b-form-input v-model="product.category" />
      </td>
      <td v-if="!product.editing">{{ product.price }}</td>
      <td v-if="product.editing">
        <b-form-input v-model="product.price" />
      </td>
      <td>
        <button class="btn btn-primary" v-if="!product.editing" @click="editProduct(product)">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn btn-success" v-if="product.editing" @click="updateProduct(product)">
          <i class="bi bi-box-arrow-down"></i>
        </button>
        <button class="btn btn-danger" @click="deleteProduct(product._id)">
          <i class="fas fa-trash-alt"></i> 
        </button>  
      </td>
          </tr>
        </tbody>
      </table>
        </div>
        <div v-else class="text-center">
            <img src="https://res.cloudinary.com/dppyim1qy/image/upload/v1701116824/empty_state_qxw60z.png" alt="No Products" style="max-width: 400px; max-height: 400px;" class="my-3">
            <p class="text-white" style="font-size: 40px;">No existen productos para mostrar.</p>
        </div>
      <br>
      <button class="btn btn-primary float-right" @click="goToCreateProducts">Crear Producto</button>
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

      goToCreateProducts() {
      this.$router.push({ name: 'CatalogoProductos' });
    },
    editProduct(product) {
      this.$set(product, 'editing', true);
    },
    async updateProduct(product) {
      const tokenAutenticacion = localStorage.getItem("jwt");
      const serverURL = "https://kind-lime-meerkat-gear.cyclic.app/";
      try {
        axios.put(`${serverURL}products/${product._id}`, {
          product: product.product,
          category: product.category,
          price: product.price,
          description: product.description,
          image: product.image
        }, {
          headers: {
            'Authorization': `Bearer ${tokenAutenticacion}`
          }
        });
        product.editing = false; // Deshabilitar modo de edición
        this.fetchProducts(); // Actualizar la lista de ligas
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      }
    },
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push('/');
    }
    }
 }
  </script>
  
  <style>
 

#app {
  font-family: 'Times New Roman', Times, serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-image: url('https://estudiarcocina.com/wp-content/uploads/2023/01/Utensilios-de-resposteria-y-pasteleria-1024x576.jpg');
  background-size: cover; /* Cubre todo el espacio disponible */
  background-repeat: no-repeat; /* Evita la repetición de la imagen */
  background-position: center center; /* Centra la imagen en el elemento */
  background-attachment: fixed;
}

.table {
  background-color: #f8f9fa;
  border-radius: 20px; /* Bordes redondeados */
  border-collapse: separate;
  border-spacing: 0;
  margin: auto;
}

.table th, .table td {
  border: 1px solid #ddd;
  text-align: center;
}

/* Aplica el color de fondo a todos los encabezados <th> en <thead>, no solo a .thead-dark */
  .thead-dark {
  background-color: #FFB38A; /* Color de fondo para los encabezados de la tabla */
  color: white;
}

.table {
  background-color: #f8f9fa;
  border-radius: 20px; /* Rounded corners for the entire table */
  overflow: hidden; /* Ensures overflow is clipped within rounded corners */
  border-collapse: separate;
  border-spacing: 0;
  margin: auto;
}

.btn {
  border-radius: 8px; /* Rounded button corners */
  margin-right: 5px;
  margin-bottom: 5px;
}

/* Estilos para botones */
.btn-primary {
  background-color: #FFB38A; /* Color para el botón Crear Producto */
  border-color: #FFB38A;
}

.btn-danger {
  background-color: #8B4513; /* Color café para el botón Eliminar */
  border-color: #8B4513;
}

.menu-container {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1000;
    padding: 10px;
    background-color: white;
  }

@media (max-width: 768px) {
  .btn-primary {
    margin-top: 15px;
    float: none;
    display: block;
  }
  .text-center {
  padding-bottom: 20px;
}

.table-responsive {
  margin-top: 20px;
  padding: 20px;
}

}

</style>
