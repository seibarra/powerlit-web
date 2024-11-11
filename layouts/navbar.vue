<template>
    <div class="flex h-[200px] bg-beige">
        <nav class="w-full flex justify-around items-center max-w-[1920px] mx-auto px-8 max-sm:flex-col">
            <NuxtLink to="/">
                <img src="@/public/powerlit-logo.webp" alt="Powerlit Logo" class="min-w-[160px]">
            </NuxtLink>
            <div class="flex max-sm:flex-col gap-3">
            <ul class="flex justify-self- items-center px-5 gap-5 text-lg text-tahiti-600">
                <li>
                    <NuxtLink to="/" class="transition-colors duration-300 ease-in-out hover:text-tahiti-800">Inicio
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/productos" class="transition-colors duration-300 ease-in-out hover:text-tahiti-800">
                        Productos</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contacto" class="transition-colors duration-300 ease-in-out hover:text-tahiti-800">
                        Contacto</NuxtLink>
                </li>
            </ul>

            <div class="flex justify-center items-center h-6 px-5">
                    <v-btn color="primary" variant="text" class="text-none">
                        <Icon name="fa-solid:user"
                            class="w-6 h-6 transition-colors duration-300 ease-in-out hover:text-tahiti-800 text-center" />
                        <v-menu activator="parent">
                            <v-list>
                                <v-list-item v-for="(item, index) in items" :key="index" :value="index">
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
const items = [
    {
        label: 'Iniciar sesión',
        icon: 'fa-solid:user',
        to: '/login'
    }
]
</script>