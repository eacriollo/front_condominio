<template>
    <div class="card">

        <h2>Metodos Pago</h2>
        <Button label="Nuevo pago" class="ingreso-button" icon="pi pi-external-link" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Metodo Pago" :style="{ width: '50vw' }" class="p-fluid">
            <label for="tipo">Ingrese tipo de pago</label>
            <InputText id="tipo" type="text" v-model="metodo.tipo" />
            <br>
            <br>
            <Button label="Guardar" class="guardar-button" :style="{ width: '10vw' }" icon="pi pi-save"
                @click="guardarMetodo()" />
        </Dialog>

        <DataTable :value="metodos" tableStyle="min-width: 50rem">

            <Column field="tipo" header="Nombre"></Column>
            <Column header="Gestion">

                <template #body="slotProps">

                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                        @click="editar(slotProps.data)" aria-label="Editar" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
                        @click="eliminar(slotProps.data.id)" aria-label="Eliminar" />

                </template>
            </Column>
        </DataTable>
        <Toast />

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import metodoServices from "../../services/metodo_pago.services.js";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const metodos = ref([]);
const visible = ref(false);
const metodo = ref({ tipo: ''});

onMounted(() => {
    getMetodo();
})

async function getMetodo() {

    const datos = await metodoServices.funListar();
    metodos.value = datos.data;
}

async function guardarMetodo() {

    try {

        if (metodo.value.id) {

            await metodoServices.funActualizar(metodo.value, metodo.value.id)
            getMetodo()
            visible.value = false
            metodo.value = { tipo: ''}
            toast.add({ severity: 'success', summary: 'Metodo Pago', detail: 'Se ha modificado los datos', life: 3000 });

        } else {

            await metodoServices.funIngresar(metodo.value)
            getMetodo()
            visible.value = false
            metodo.value = { tipo: '' }
            toast.add({ severity: 'success', summary: 'Metodo Pago', detail: 'Se ha guardado los datos', life: 3000 });
        }
    } catch (error) {
        alert(error)
    }
}

function editar(valor) {

    metodo.value = valor;
    visible.value = true;

}

async function eliminar(id) {
    if (confirm("Esta seguro de eliminar los datos")) {
        await metodoServices.funEliminar(id);
        getMetodo();
        toast.add({ severity: 'success', summary: 'Metodo Pago', detail: 'Se ha eliminado los datos', life: 3000 });
    }
}

</script>