<template>
    <div class="grid">
        <div class="col-12">
            <div class="card p-fluid">
                <h2>DATOS DEL CONDOMINIO</h2>
                <!--  {{ datos._rawValue}} -->
                <div class="p-fluid formgrid grid">

                    <div class="field col-12 md:col-5">
                        <label for="nombre">Nombre</label>
                        <InputText v-model="datos.nombre" id="nombre" disabled type="text" />
                    </div>
                    <div class="field col-12 md:col-5">
                        <label for="direccion">Dirección</label>
                        <InputText v-model="datos.direccion" disabled id="direccion" type="text" />
                    </div>
                    <div class="field col-12 md:col-5">
                        <label for="ruc">Ruc</label>
                        <InputText v-model="datos.ruc" disabled id="ruc" type="number" />
                    </div>
                    <div class="field col-12 md:col-5">
                        <label for="tel">Telefono</label>
                        <InputText v-model="datos.telefono" disabled id="tel" type="text" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <span>IMAGEN</span>
                        <div class="flex justify-content-center">
                            <Image :src="'demo/images/galleria/galleria11.jpg'" alt="Image" width="150" preview />
                        </div>
                    </div>
                </div>
                <div class="p-fluid formgrid grid">

                    <div class="field col-12 md:col-3">
                        <Button label="Actualizar" class="p-button-warning mr-2 mb-2" icon="pi pi-external-link"
                            @click="editar" />


                    </div>

                </div>
            </div>
        </div>
    </div>

    <Dialog v-model:visible="visible" modal header="Cuota" :style="{ width: '50vw' }" class="p-fluid">
        <label for="nombre">Nombre</label>
        <InputText id="nombre" type="text" v-model="datos.nombre" />
        <label for="direccion">Direccion</label>
        <InputText id="direccion" type="text" v-model="datos.direccion" />
        <label for="ruc">Ruc</label>
        <InputText v-model="datos.ruc" id="ruc" type="number" />
        <label for="tel">Telefono</label>
        <InputText v-model="datos.telefono" id="tel" type="number" />
        <br>
        <br>
        <Button label="Guardar" class="guardar-button" :style="{ width: '10vw' }" icon="pi pi-save"
            @click="guardarDatos()" />


    </Dialog>
    <Toast />
</template>


<script setup>
import datosServices from "@/services/datos.services";
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const datos = ref({

});

const dato = ref({ nombre: '' });
const visible = ref(false);


onMounted(() => {
    getDatos()
    // console.log(datos.value)
})

async function getDatos() {
    const dato = await datosServices.funListar();
    datos.value = dato.data[0]

}

function editar() {
    visible.value = true;
}

async function guardarDatos() {

try {

    if (datos.value.id) {

        await datosServices.funActualizar(datos.value, datos.value.id)
        getDatos()
        visible.value = false
       
        toast.add({ severity: 'success', summary: 'Datos', detail: 'Se ha modificado los datos', life: 3000 });

    } 

} catch (error) {
    alert(error)
}
}

</script>