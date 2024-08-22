<template>
  <div class="card" v-if="usuario">
    <h1>USUARIO</h1>
    <h1> Nombre: {{ usuario.name }}</h1>
    <h1> Correo: {{ usuario.email }}</h1>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import authServices from '../services/auth.services';


const usuario = ref(null)


async function perfil() {

  const { data } = await authServices.funPerfil();
  usuario.value = data
}

perfil()
</script>
