<template>
    <div class="flex sm:h-[170px] max-sm:h-[200px] bg-beige">
        <nav class="w-full flex justify-around items-center max-w-[1920px] mx-auto px-8 py-5 max-sm:flex-col">
            <NuxtLink to="/">
                <NuxtImg src="/images/powerlit-logo.webp" alt="Powerlit Logo" class="max-sm:w-[160px] sm:w-[200px]" />
            </NuxtLink>
            <div class="flex gap-3 max-sm:flex-col max-sm:gap-5">
                <ul class="flex items-center px-5 gap-5 text-lg text-[#333]">
                    <li>
                        <NuxtLink to="/" class="transition-colors duration-300 ease-in-out hover:text-tahiti-700">
                            Inicio</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/productos/tanques-de-agua"
                            class="transition-colors duration-300 ease-in-out hover:text-tahiti-700">
                            Productos</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/contacto"
                            class="transition-colors duration-300 ease-in-out hover:text-tahiti-700">
                            Contacto</NuxtLink>
                    </li>
                </ul>

                <div class="flex justify-center items-center h-6 px-5">
                    <v-btn icon color="#333" variant="tonal" class="text-none">
                        <v-icon>mdi-account</v-icon>
                        <v-menu activator="parent">
                            <v-list v-if="userStore.user">
                                <v-list-item>
                                    <v-list-item-title>
                                        <NuxtLink to="/cuenta">
                                            Mi cuenta
                                        </NuxtLink>
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-title>
                                            Modo oscuro
                                    </v-list-item-title>
                                </v-list-item> 
                                <v-list-item>
                                    <v-list-item-title @click="userStore.logout()">
                                            Cerrar sesión
                                    </v-list-item-title>
                                </v-list-item>                                    
                            </v-list>
                            <v-list v-else>
                                <v-list-item v-for="(item, index) in menuItems" :key="index" :value="index">
                                    <v-list-item-title>
                                        <NuxtLink :to="item.to">
                                            {{ item.label }}
                                        </NuxtLink>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-btn>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
const menuItems = [
    {
        label: 'Iniciar sesión',
        icon: 'fa-solid:user',
        to: '/login'
    }
]

const userStore = useUserStore()
</script>