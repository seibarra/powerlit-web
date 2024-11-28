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
            v-if="(!selectedChanged && route.params.category === 'tanques-de-agua') || (selectedChanged && selected === 0)"
         >
            <header class="mb-5 w-full border-b border-gray-500">
                <h1 class="text-4xl p-3">Tanques de agua</h1>
            </header>
            
            <ProductGrid :products="waterTanks" />
        </section>
    </section>
</template>

<script setup lang="ts">
import { type Product } from '~/types/entities';
const supabase = useSupabaseClient()
const items = [
    { label: 'Tanques de agua',
        id: 'tanques-de-agua',
        image: '/images/productos_powerlit/tanques/1000/tanque_1000_beige.avif'
     },
    { label: 'Biodigestores',
        id: 'biodigestores',
        image: '/images/productos_powerlit/biodigestores/biodigestor_autolimpiante_600.avif'
     },
    { label: 'Cámaras sépticas',
        id: 'camaras-septicas',
        image: '/images/productos_powerlit/camaras_septicas/camara_septica_280.avif'
     }
]

const waterTanks = ref<Product[]>([])

const route = useRoute()
const selected = ref(items.findIndex(item => item.id === route.params.category) || 0)
const selectedChanged = ref(false)

function editParam(param: string) {
    history.pushState({}, '', '/c/' + param)
}

onMounted(async () => {
    if (route.params.category === 'tanques-de-agua') {
        const { data, error } = await supabase.from('products').select().eq('category', 'Tanque de agua').order('capacity')
        if (error) {
            console.log('error: ', error)
        }
        else {
            console.log('data: ', data)
            
            waterTanks.value = data
        } 
    }
})

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