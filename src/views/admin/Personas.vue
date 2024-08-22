<template>
    <div class="card">

        <h2>Gestion Personas</h2>
        <Button label="Nueva persona" class="ingreso-button" icon="pi pi-external-link" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Persona" :style="{ width: '50vw' }" class="p-fluid">
            <label for="persona">Ingresar nombre</label>
            <InputText id="persona" type="text" v-model="persona.nombre" />
            <label for="telefono">Ingresar telefono</label>
            <InputText id="telefono" type="number" v-model="persona.telefono" />
            <br>
            <br>
            <Button label="Guardar" class="guardar-button" :style="{ width: '10vw' }" icon="pi pi-save"
                @click="guardarPersona()" />
        </Dialog>

        <DataTable :value="personas" tableStyle="min-width: 50rem">

            <Column field="nombre" header="Nombre"></Column>
            <Column field="telefono" header="Telefono"></Column>
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
import personaServices from "../../services/personas.services.js";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const personas = ref([]);
const visible = ref(false);
const persona = ref({ nombre: '', telefono: '' });

onMounted(() => {
    getPersona();
})

async function getPersona() {

    const datos = await personaServices.funListar();
    personas.value = datos.data;
}

async function guardarPersona() {

    try {

        if (persona.value.id) {

            await personaServices.funActualizar(persona.value, persona.value.id)
            getPersona()
            visible.value = false
            persona.value = { nombre: '', telefono: '' }
            toast.add({ severity: 'success', summary: 'Persona', detail: 'Se ha modificado la persona', life: 3000 });

        } else {

            await personaServices.funIngresar(persona.value)
            getPersona()
            visible.value = false
            persona.value = { nombre: '', telefono: '' }
            toast.add({ severity: 'success', summary: 'Persona', detail: 'Se ha guardado los datos', life: 3000 });
        }
    } catch (error) {
        alert(error)
    }
}

function editar(valor) {

    persona.value = valor;
    visible.value = true;

}

async function eliminar(id) {
    if (confirm("Esta seguro de eliminar los datos")) {
        await personaServices.funEliminar(id);
        getPersona();
        toast.add({ severity: 'success', summary: 'Persona', detail: 'Se ha eliminado los datos', life: 3000 });
    }
}

</script>