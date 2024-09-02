<template>
    <div class="card">
        <h2>Propiedades</h2>

        <Toolbar class="mb-4">
            <template v-slot:start>
                <div class="my-2">
                    <Button label="CREAR PROPIEDAD" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />               
                  </div>
            </template>
        </Toolbar>

        <DataTable ref="dt" :value="propiedad" :totalRecords="totalRecords" dataKey="id" lazy :loading="loading"
            @page="onPage($event)" :paginator="true" :rows="10"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} ordenes" responsiveLayout="scroll">
            <template #header>
                <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h5 class="m-0">Gestion propiedades</h5>
                    <span class="block mt-2 md:mt-0 p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText placeholder="Propiedad....." v-model="buscar" @keypress.enter="buscador()" />
                    </span>
                </div>
            </template>
            <Column field="numero_unidad" header="NOMBRE" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                <template #body="slotProps">
                    <span class="p-column-title">NOMBRE</span>
                    {{ slotProps.data.numero_unidad }}
                </template>
            </Column>

            <Column field="ubicacion" header="UBICACION" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                <template #body="slotProps">
                    <span class="p-column-title">UBICACION</span>
                    {{ slotProps.data.ubicacion }}
                </template>
            </Column>
            <Column field="nombre" header="NOMBRE" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                <template #body="slotProps">
                    <span class="p-column-title">NOMBRE</span>
                    {{ slotProps.data.persona.nombre }}
                </template>
            </Column>

            <Column field="cuota" header="CUOTA" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                <template #body="slotProps">
                    <span class="p-column-title">CUOTA</span>
                    {{ slotProps.data.cuota.valor }}
                </template>
            </Column>

            <Column header="GESTION" headerStyle="min-width:10rem;">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                        @click="editar(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
                        @click="eliminar(slotProps.data.id)" />
                </template>
            </Column>
        </DataTable>
    </div>

    <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="PROPIEDAD" :modal="true"
        class="p-fluid">
        {{ propiedades }}
        <div class="field">
            <label for="numero">UNIDAD</label>
            <InputText id="numero" v-model.trim="propiedades.numero_unidad" required="true" autofocus
                :class="{ 'p-invalid': submitted && !propiedades.numero_unidad }" />
            <small class="p-invalid" v-if="submitted && !propiedades.numero_unidad">serie requerida.</small>
        </div>

        <div class="field">
            <label for="numero">UBICACION</label>
            <InputText id="numero" v-model.trim="propiedades.ubicacion" required="true" autofocus
                :class="{ 'p-invalid': submitted && !propiedades.ubicacion }" />
            <small class="p-invalid" v-if="submitted && !propiedades.ubicacion">serie requerida.</small>
        </div>

        <div class="field">
            <label for="dropdown">NOMBRE</label>
            <Dropdown id="dropdown" v-model.trim="propiedades.id_personas" :options="personas" optionLabel="nombre"
                optionValue="id" required="true" :class="{ 'p-invalid': submitted && !propiedades.id_personas }" />
            <small class="p-invalid" v-if="submitted && !propiedades.id_personas">Valor requerido</small>
        </div>
        <div class="field">
            <label for="dropdown">CUOTA</label>
            <Dropdown id="dropdown" v-model.trim="propiedades.id_cuotas" :options="cuotas" optionLabel="valor"
                optionValue="id" required="true" :class="{ 'p-invalid': submitted && !propiedades.id_cuotas }" />
            <small class="p-invalid" v-if="submitted && !propiedades.id_cuotas">Valor requerido</small>
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="guardarPropiedad()" />
        </template>
    </Dialog>
    <Toast />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import propiedadServices from "@/services/propiedad.services";
import personaServices from "../../services/personas.services.js";
import cuotaServices from "../../services/cuota.services.js";

const toast = useToast();

const dt = ref(null);
const loading = ref(false);
const lazyParams = ref({ page: 0 });
const totalRecords = ref(0);
const propiedad = ref();
const buscar = ref([]);
const propiedades = ref();
const productDialog = ref(false);
const submitted = ref(false);
const personas = ref([]);
const cuotas = ref([]);

const onPage = (event) => {
    lazyParams.value = event;
    listarOrdenes();
};

onMounted(() => {
    getPropiedad();
    getPersona();
    getCuota();
});

async function getPropiedad() {
    loading.value = true;

    try {
        let page = lazyParams.value.page + 1;
        let limit = lazyParams.value.rows;
        const { data } = await propiedadServices.funListar(
            page,
            limit,
            buscar.value
        );

        loading.value = false;
        propiedad.value = data.data;
        totalRecords.value = data.total;
        
    } catch (error) {
        console.error("AxiosError:", error);
        alert(error);
    }
}

async function guardarPropiedad() {
    submitted.value = true;
    

    if (propiedades.value.numero_unidad && propiedades.value.ubicacion) {
        
        try {
            if (propiedades.value.id) {
                await propiedadServices.funModificar(propiedades.value, propiedades.value.id);

                propiedades.value = {
                    numero_unidad: "",
                    ubicacion: "",
                    id_persona: "",
                    id_cuotas: " "
                };
                toast.add({
                    severity: "success",
                    summary: "Propiedades",
                    detail: "Se ha modificado los datos",
                    life: 3000,
                });
            } else {
                await propiedadServices.funGuardar(propiedades.value);
                
               
                propiedades.value = {
                    numero_unidad: "",
                    ubicacion: "",
                    id_persona: "",
                    id_cuotas: " "
                };
                toast.add({
                    severity: "success",
                    summary: "Propiedades",
                    detail: "Se ha guardado los datos",
                    life: 3000,
                });
            }
            productDialog.value = false;
            getPropiedad();
        } catch (error) {
            console.error("AxiosError:", error);
            alert(error);
        }
    }

}

async function getPersona() {
    const datos = await personaServices.funListar();
    personas.value = datos.data;
}

async function getCuota() {
    const datos = await cuotaServices.funListar();
    cuotas.value = datos.data;
}

const openNew = () => {
    propiedades.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const buscador = () => {
    getPropiedad();
};

function editar(act) {
  
    productDialog.value = ref(true);
    propiedades.value = act;

}

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

async function eliminar(id) {
    if (confirm("Esta seguro de eliminar los datos")) {
        await propiedadServices.funEliminar(id);
        getPropiedad();
        toast.add({ severity: 'success', summary: 'Propiedd', detail: 'Se ha eliminado los datos', life: 3000 });
    }
}
</script>
