<!-- Bento grid de tanques de agua -->
<template>
    <section>
        <header class="absolute top-0 left-0 w-full h-full z-10">
            <v-card>
                <v-tabs show-arrows v-model="selected" align-tabs="center" class="tabs">
                    <v-tab v-for="item, index in items" :key="index" :text="item.label" size="medium"
                        class="text-none px-5">
                        <div>
                            <p class="my-5">{{ item.label }}</p>
                            <NuxtImg :src="item.image" class="m-auto h-20"></NuxtImg>
                        </div>
                    </v-tab>
                </v-tabs>
            </v-card>
        </header>
        <div class="h-10"></div>
        <section 
            class="md:px-6 sm:px-2"
            v-if="(!selectedChanged && route.params.producto === 'tanques-de-agua') || (selectedChanged && selected === 0)"
         >
            <header class="mb-5 w-full border-b border-gray-500">
                <h1 class="text-4xl p-3">Tanques de agua</h1>
            </header>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                <v-card 
                v-for="item, index in waterTanks"
                :key="index"
                :class="index === 1 ? 'md:col-span-2 ambar' : 'md:col-span-1'"
                class="d-flex flex-column"
                link
                >
                <v-spacer></v-spacer>

                <div class="w-full">
                    <NuxtImg :src="item.image" class="m-auto h-[300px]"></NuxtImg>
                </div>

                <v-spacer></v-spacer>

                    <v-card-title>
                        {{ item.label }}
                    </v-card-title>

                    <v-card-subtitle>
                        {{ item.description }}
                    </v-card-subtitle>

                    <v-card-actions >
                        <v-btn color="orange" text="Ver más"></v-btn>

                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </div>
        </section>
        <section v-if="(!selectedChanged && route.params.producto === 'biodigestores') || (selectedChanged && selected === 1)">
            <header>
                <h1 class="text-4xl p-3">Biodigestores</h1>
            </header>
        </section>
        <section v-if="(!selectedChanged && route.params.producto === 'camaras-septicas') || (selectedChanged && selected === 2)">
            <header>
                <h1 class="text-4xl p-3">Cámaras sépticas</h1>
            </header>
        </section>
        <section v-if="(!selectedChanged && route.params.producto === 'accesorios') || (selectedChanged && selected === 3)">
            <header>
                <h1 class="text-4xl p-3">Accesorios</h1>
            </header>
        </section>
    </section>
</template>

<script setup lang="ts">
const items = [
    { label: 'Tanques de agua',
        id: 'tanques-de-agua',
        image: '/images/tanques/tanque_470_tricapa.webp'
     },
    { label: 'Biodigestores',
        id: 'biodigestores',
        image: '/images/biodigestores/biodigestor_autolimpiante.webp'
     },
    { label: 'Cámaras sépticas',
        id: 'camaras-septicas',
        image: '/images/camaras_septicas/camara_septica.webp'
     },
    { label: 'Accesorios',
        id: 'accesorios',
        image: '/images/accesorios/tapa_plastica_1,17.webp'
     }
]

const waterTanks = ref([
    { label: 'Tanque de agua tricapa 470 litros',
    description: 'Tanque de agua tricapa 470 litros',
    image: '/images/tanques/tanque_470_tricapa.webp' },
    { label: 'Tanque de agua 1000 cuatricapa',
    description: 'Tanque de agua 1000 cuatricapa',
    image: '/images/tanques/tanque_1000_cuatricapa.webp' },
    { label: 'Tanque de agua 750 bicapa',
    image: '/images/tanques/tanque_750_bicapa.webp' },
    { label: 'Tanque de agua 4',
    image: '/images/tanques/tanque_470_tricapa.webp' },
    { label: 'Tanque de agua tricapa 470 litros',
    description: 'Tanque de agua tricapa 470 litros',
    image: '/images/tanques/tanque_470_tricapa.webp' },
    { label: 'Tanque de agua 1000 cuatricapa',
    description: 'Tanque de agua 1000 cuatricapa',
    image: '/images/tanques/tanque_1000_cuatricapa.webp' },
    { label: 'Tanque de agua 750 bicapa',
    image: '/images/tanques/tanque_750_bicapa.webp' },
    { label: 'Tanque de agua 4',
    image: '/images/tanques/tanque_470_tricapa.webp' },
])

const route = useRoute()
const selected = ref(items.findIndex(item => item.id === route.params.producto) || 0)
const selectedChanged = ref(false)

function editParam(param: string) {
    history.pushState({}, '', '/productos/' + param)
}

watch(selected, () => {
    editParam(items[selected.value].id)
    selectedChanged.value = true
})
</script>

<style scoped>
.tabs {
    transition: all 0.3s ease-in-out;
}

.v-tabs:hover {
    height: 145px !important;
}

.ambar {
    background-color: rgb(255, 245, 230) !important;
}
</style>