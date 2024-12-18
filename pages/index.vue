<template>
    <ClientOnly>
        <div class="w-full">
            <video src="/images/powerlit_banner.webm" autoplay muted width="100%"></video>
        </div>
    </ClientOnly>

    <section class="max-xl:max-w-[100vw] lg:max-w-[1366px] mx-auto sm:px-6 max-sm:px-4">
        <section class="my-8">
            <v-card class="image-background" rounded="xl">
                <h1 class="text-4xl p-6">Tanques de agua</h1>
                
                <div class="w-full flex p-6 gap-6 max-sm:flex-col">
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

            <v-carousel v-model="model" :show-arrows="false" hide-delimiters height="100%">
            <v-carousel-item
                v-for="(tankType, i) in tanques"
                :key="i"
                :value="i"
            >
                <div class="w-full flex max-sm:flex-col items-center my-4 border-b-2 border-slate-300 rounded-b-lg">
                    <div class="max-w-[550px] w-full">
                        <NuxtImg :src="tankType.src" class="mx-auto px-10" sizes="sm:470px" height="530" width="530"></NuxtImg>
                    </div>
                    <div class="w-full min-h-[250px] sm:border-l-8 sm:border-slate-500 pl-5">
                        <h2 class="text-2xl font-bold w-min pb-1 px-2 m-3 border-b-2 border-slate-500">{{ tankType.name }}</h2>
                        <div class="m-3">
                            <p class="text-lg">
                                Capa exterior negra, evita la formación de algas con filtro solar ultravioleta.
                            </p>
                            <p class="text-lg">
                                Capa interior blanca, mayor resistencia al impacto, terminación extraigo para evitar adherencias, facilitando su limpieza.
                            </p>

                            <v-btn to="/c/tanques-de-agua" class="text-none mt-3" color="#ffebc9ee">
                                Ver más
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-carousel-item>
            </v-carousel>
        </section>

        <section class="my-8">
            <v-card class="image-background-2" rounded="xl">
                <h1 class="text-4xl p-6">Biodigestores</h1>
                
                <div class="w-full flex p-6 gap-6 max-sm:flex-col">
                    <v-btn class="text-none " color="#ffebc9ee" @click="model2 = 0">
                        Biodigestor
                    </v-btn>
                    <v-btn class="text-none " color="#ffebc9ee" @click="model2 = 1">
                        Autolimpiante
                    </v-btn>
                </div>
            </v-card>
            <v-carousel v-model="model2" :show-arrows="false" hide-delimiters height="100%">
                <v-carousel-item
                    v-for="(biodigestor, i) in biodigestores"
                    :key="i"
                    :value="i"
                >
            
                    <div class="w-full flex max-sm:flex-col items-center my-4 border-b-2 border-slate-300 rounded-b-lg">
                        <div class="max-w-[550px] w-full">
                            <NuxtImg :src="biodigestor.src" class="mx-auto px-10"></NuxtImg>
                        </div>
                        <div class="w-full py-5 sm:border-l-8 sm:border-slate-500 pl-5">
                            <h2 class="text-2xl font-bold w-fit pb-1 px-2 m-3 border-b-2 border-slate-500">{{ biodigestor.name }}</h2>
                            <div class="m-3">
                                <p class="text-lg" v-for="description in biodigestor.descriptions">
                                    {{ description }}
                                </p>

                                <v-btn to="/c/biodigestores" class="text-none mt-3" color="#ffebc9ee">
                                    Ver más
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </v-carousel-item>
            </v-carousel>
        </section>
    

    <section class="my-8">
            
            <v-card class="image-background" rounded="xl" >
                <h1 class="text-4xl p-6">Cámaras sépticas</h1>
                
                <div class="w-full flex p-6 gap-6">
                    <v-btn class="text-none " color="#ffebc9ee">
                        Cámara séptica
                    </v-btn>
                </div>
            </v-card>

                <div class="w-full flex max-sm:flex-col items-center my-4 border-b-2 border-slate-300 rounded-b-lg">
                    <div class="max-w-[550px] w-full">
                        <NuxtImg src="/images/productos_powerlit/camaras_septicas/camara_septica_550.avif" height="530" width="530" class="mx-auto"></NuxtImg>
                    </div>
                <div class="w-full sm:border-l-8 sm:border-slate-500 pl-5">
                    <h2 class="text-2xl font-bold w-fit pb-1 px-2 m-3 border-b-2 border-slate-500">Cámara séptica</h2>
                    <div class="m-3">
                        <p class="text-lg">Producto reforzado, liviano y durable.</p>

                        <p class="text-lg">Fácil limpieza y mantenimiento.</p>

                        <p class="text-lg">Resinas de polietileno 100% vírgenes.</p>

                        <p class="text-lg">Tamaños: 280, 400, 550 y 1000 litros.</p>

                        <v-btn to="/c/cámaras-sépticas" class="text-none mt-3" color="#ffebc9ee">
                            Ver más
                        </v-btn>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script setup lang="ts">
const tanques = [
    {
        name: 'Bicapa',
        src: '/images/productos_powerlit/tanques/1000/tanque_1000_negro.avif',
        descriptions: []
    },
    {
        name: 'Tricapa',
        src: '/images/productos_powerlit/tanques/1000/tanque_1000_beige.avif',
        descriptions: []
    },
    {
        name: 'Cuatricapa',
        src: '/images/productos_powerlit/tanques/1000/tanque_1000_gris.avif',
        descriptions: []
    },
]

const biodigestores = [
    {
        name: 'Biodigestor',
        src: '/images/productos_powerlit/biodigestores/biodigestor_750.avif',
        descriptions: [
            'Biodigestor de flujo continuo.',
            'Equipado con filtro biológico para una mayor eficiencia en el proceso anaeróbico.',
            '- No genera olores',
            '- Preserva el medio ambiente con una menor contaminación de las napas freáticas, el agua a la salida tiene nutrientes que promueven el crecimiento de las plantas, por lo que puede ser utilizado para riego de jardines.'
        ]
    },
    {
        name: 'Biodigestor autolimpiante',
        src: '/images/productos_powerlit/biodigestores/biodigestor_autolimpiante_600.avif',
        descriptions: ['Nuestro biodigestor autolimpiante está diseñado para maximizar la eficiencia del tratamiento de aguas residuales, manteniéndose limpio automáticamente y reduciendo significativamente la necesidad de mantenimiento.']
    }
]

const model = ref(0)
const model2 = ref(1)
const model3 = ref(0)
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