<template>
    <div class="card">
        <h2>Propiedades</h2>

        <DataTable ref="dt" :value="propiedad" :totalRecords="totalRecords" dataKey="id" lazy :loading='loading'
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
                <label for="numero">UBICACION</label>
                <InputText id="numero" v-model.trim="propiedades.persona.nombre" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !propiedades.ubicacion }" />
                <small class="p-invalid" v-if="submitted && !propiedades.ubicacion">serie requerida.</small>
            </div>
            <div class="field">
                <label for="dropdown">Nombre</label>
                <Dropdown id="dropdown" v-model="propiedades.persona.id" :options="nombre" optionLabel="nombre"
                    optionValue="id" required="true" :class="{ 'p-invalid': submitted && !selectedPersonaId }" />
                <small class="p-invalid" v-if="submitted && !selectedPersonaId">Valor requerido</small>
            </div>
          
            <!--{{ product }}
            img :src="'demo/images/product/' + product.image" :alt="product.image" v-if="product.image" width="150"
                class="mt-0 mx-auto mb-5 block shadow-2" /
  <div class="field">
                <label for="dropdown"></label>s
                <Dropdown id="dropdown" v-model="product.persona" :options="nombre" optionLabel="nombre"
                    optionValue="id" required="true" :class="{ 'p-invalid': submitted && !product.actividad_id }" />
                <small class="p-invalid" v-if="submitted && !product.actividad_id">Valor requerido</small>
            </div>
           

            <div class="field">
                <label for="dropdown">Tipo</label>
                <Dropdown id="dropdown" v-model="product.actividad_id" :options="actividad" optionLabel="tipo"
                    optionValue="id" required="true" :class="{ 'p-invalid': submitted && !product.actividad_id }" />
                <small class="p-invalid" v-if="submitted && !product.actividad_id">Valor requerido</small>
            </div>

            <div class="field">

                <label for="dropdown">Valor</label>
                <Dropdown id="dropdown" v-model="product.precio_id" :options="precios" optionLabel="precio"
                    optionValue="id" required="true" :class="{ 'p-invalid': submitted && !product.precio_id }" />
                <small class="p-invalid" v-if="submitted && !product.precio_id">Valor requerido</small>

            </div>

            <div class="field">

                <label for="calendar">Fecha</label>
                <Calendar id="calendar" v-model="product.fecha" showIcon inputId="product.fecha"
                    @input="onFechaSeleccionada" required="true"
                    :class="{ 'p-invalid': submitted && !product.fecha }" />
                <small class="p-invalid" v-if="submitted && !product.fecha">Fecha requerida</small>
            </div>

            <div class="field">
                <label for="ticket">TICKET</label>
                <InputText id="ticket" v-model.trim="product.ticket" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !product.serie }" />
                <small class="p-invalid" v-if="submitted && !product.serie">serie requerida.</small>
            </div>

            <div class="field">
                <label for="numero">ACTA</label>
                <InputText id="numero" v-model.trim="propiedades.numero_unidad" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !propiedades.numero_unidad }" />
                <small class="p-invalid" v-if="submitted && !propiedades.numero_unidad">serie requerida.</small>
            </div>
             -->
           
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="actualizarOrden()" />
            </template>

        </Dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from 'primevue/usetoast';
import propiedadServices from '@/services/propiedad.services'
const toast = useToast();

const dt = ref(null);
const loading = ref(false);
const lazyParams = ref({ page: 0 });
const totalRecords = ref(0)
const propiedad = ref()
const buscar = ref([])
const propiedades = ref()
const productDialog = ref(false);
const submitted = ref(false);
const onPage = (event) => {
    lazyParams.value = event
    listarOrdenes()
}

onMounted(() => {
    getPropiedad()
})

async function getPropiedad() {
    loading.value = true

    try {

        let page = lazyParams.value.page + 1;
        let limit = lazyParams.value.rows;
        const { data } = await propiedadServices.funListar(page, limit, buscar.value);
        console.log(propiedad)
        loading.value = false
        propiedad.value = data.data
        totalRecords.value = data.total
        // console.log(propiedad)
    } catch (error) {
        console.error('AxiosError:', error);
        alert(error)
    }


}

const buscador = () => {
    getPropiedad()
};

function editar(act) {

    propiedades.value = act;

    productDialog.value = ref(true);

}

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

</script>