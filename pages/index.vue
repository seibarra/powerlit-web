<template>
    <section>
        <header>
            <v-carousel hide-delimiters cycle>
                <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
                cover
                ></v-carousel-item>
            </v-carousel>
        </header>

        <section class="my-8 md:px-6 sm:px-2">
            
            <v-card class="w-full image-background" rounded="xl">
                <h1 class="text-4xl p-6">Tanques de agua</h1>
                
                <div class="w-full flex p-6 gap-6">
                    <v-btn class="text-none " color="#ffebc9ee" @click="model = 0">
                        Bicapa
                    </v-btn>
                    <v-btn class="text-none " color="#ffebc9ee" @click="model = 1">
                        Tricapa
                    </v-btn>
                    <v-btn class="text-none " color="#ffebc9ee" @click="model = 2">
                        Cuatricapa
                    </v-btn>
                </div>
            </v-card>

            <v-carousel v-model="model" :show-arrows="false" hide-delimiters>
            <v-carousel-item
                v-for="(tankType, i) in tankTypes"
                :key="i"
                :value="i"
            >
                <div class="w-full flex max-sm:flex-col items-center my-4 border-b-2 border-slate-300 rounded-b-lg">
                <NuxtImg src="/images/tanques/tanque_1000_cuatricapa.webp" class="h-[350px]"></NuxtImg>
                <div class="w-full h-[250px] sm:border-l-8 sm:border-slate-500 max-sm:text-center">
                    <h2 class="text-2xl font-bold w-min pb-1 px-2 m-3 border-b-2 border-slate-500">{{ tankType.name }}</h2>
                    <NuxtImg src="/images/tanques/cuatricapa.png" class="h-[200px]"></NuxtImg>
                </div>
            </div>
            </v-carousel-item>
            </v-carousel>
        </section>

        <section class="my-8 md:px-6 sm:px-2">
            <v-card class="w-full image-background-2" rounded="xl">
                <h1 class="text-4xl p-6">Biodigestores</h1>
                
                <div class="w-full flex p-6 gap-6">
                    <v-btn class="text-none " color="#ffebc9ee">
                        Biodigestor autolimpiante
                    </v-btn>
                </div>
            </v-card>

                <div class="w-full flex max-sm:flex-col items-center my-4 border-b-2 border-slate-300 rounded-b-lg">
                <NuxtImg src="/images/biodigestores/biodigestor_autolimpiante.webp" class="h-[350px]"></NuxtImg>
                <div class="w-full h-[250px] sm:border-l-8 sm:border-slate-500 max-sm:text-center">
                    <h2 class="text-2xl font-bold w-fit pb-1 px-2 m-3 border-b-2 border-slate-500">Biodigestor autolimpiante</h2>
                    <div class="m-3">
                        <p class="text-lg">
                            Nuestro biodigestor autolimpiante está diseñado para maximizar la eficiencia del tratamiento de aguas residuales, manteniéndose limpio automáticamente y reduciendo significativamente la necesidad de mantenimiento.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </section>

    <section class="my-8 md:px-6 sm:px-2">
            
            <v-card class="w-full image-background" rounded="xl">
                <h1 class="text-4xl p-6">Cámaras sépticas</h1>
                
                <div class="w-full flex p-6 gap-6">
                    <v-btn class="text-none " color="#ffebc9ee">
                        Cámara séptica
                    </v-btn>
                </div>
            </v-card>

                <div class="w-full flex max-sm:flex-col items-center my-4 border-b-2 border-slate-300 rounded-b-lg">
                <NuxtImg src="/images/camaras_septicas/camara_septica.webp" class="h-[350px]"></NuxtImg>
                <div class="w-full h-[250px] sm:border-l-8 sm:border-slate-500 max-sm:text-center">
                    <h2 class="text-2xl font-bold w-fit pb-1 px-2 m-3 border-b-2 border-slate-500">Cámara séptica</h2>
                    <div class="m-3">
                        <p class="text-lg">Producto reforzado, liviano y durable.</p>

                        <p class="text-lg">Fácil limpieza y mantenimiento.</p>

                        <p class="text-lg">Resinas de polietileno 100% virgenes.</p>

                        <p class="text-lg">Tamaños: 280, 400, 550 y 1000 litros.</p>
                    </div>
                </div>
            </div>
        </section>
</template>

<script setup lang="ts">
const items = [
    {
        src: '/images/tanques/tanques_slider_2.jpg',
    },
    {
        src: '/images/tanques/tanques_slider_1.jpg',
    }
]

const tankTypes = [
    {
        name: 'Bicapa',
        src: '/images/tanques/tanque_1000_bicapa.webp',
    },
    {
        name: 'Tricapa',
        src: '/images/tanques/tanque_1000_tricapa.webp',
    },
    {
        name: 'Cuatricapa',
        src: '/images/tanques/tanque_1000_cuatricapa.webp',
    },
]

const model = ref(0)
</script>

<style>
.image-background {
    background-image: url('/images/front_1.webp') !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
}

.image-background-2 {
    background-image: url('/images/front_2.webp') !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
}
</style>