<template>
    <div class="card">

        <h2>Gestion cuotas</h2>
        <Button label="Nueva cuota" class="ingreso-button" icon="pi pi-external-link" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Cuota" :style="{ width: '50vw' }" class="p-fluid">
            <label for="cuota">Ingresar el valor</label>
            <InputText id="cuota" type="number" v-model="cuota.valor" />
            <label for="estado">Ingresar el estado</label>
            <InputText id="estado" type="text" v-model="cuota.estado" />
            <br>
            <br>
            <Button label="Guardar" class="guardar-button" :style="{ width: '10vw' }" icon="pi pi-save"
                @click="guardarCuota()" />
        </Dialog>

        <DataTable :value="cuotas" tableStyle="min-width: 50rem">

            <Column field="valor" header="Valor"></Column>
            <Column field="estado" header="Estado"></Column>
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
import cuotaServices from "../../services/cuota.services.js";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const cuotas = ref([]);
const visible = ref(false);
const cuota = ref({ valor: '', estado: '' });

onMounted(() => {
    getCuota();
})

async function getCuota() {

    const datos = await cuotaServices.funListar();
    cuotas.value = datos.data;
}

async function guardarCuota() {

    try {

        if (cuota.value.id) {

            await cuotaServices.funActualizar(cuota.value, cuota.value.id)
            getCuota()
            visible.value = false
            cuota.value = { valor: '', estado: '' }
            toast.add({ severity: 'success', summary: 'Cuota', detail: 'Se ha modificado el valor', life: 3000 });

        } else {

            await cuotaServices.funIngresar(cuota.value)
            getCuota()
            visible.value = false
            cuota.value = { valor: '', estado: '' }
            toast.add({ severity: 'success', summary: 'Cuota', detail: 'Se ha guardado el valor', life: 3000 });
        }
    } catch (error) {
        alert(error)
    }
}

function editar(valor) {

    cuota.value = valor;
    visible.value = true;

}

async function eliminar(id) {
    if (confirm("Esta seguro de eliminar el valor")) {
        await cuotaServices.funEliminar(id);
        getCuota();
        toast.add({ severity: 'success', summary: 'Cuota', detail: 'Se ha eliminado el valor', life: 3000 });
    }
}

</script>