<template>
    <div class="flex h-full">
        <div class="drawer max-sm:hidden sm:w-[200px] md:w-[250px] bg-white border-r-2 border-gray-200 shadow-[5px_2px_10px_-2px_rgba(0,0,0,0.10)] z-10">
            <ul class="flex flex-col p-3">
                <li @click="selected = 'account'" class="text-lg text-gray-700 hover:bg-slate-400 hover:bg-opacity-20 p-3 pl-5 cursor-pointer">
                    Cuenta
                </li>

                <li @click="selected = 'purchases'" class="text-lg text-gray-700 hover:bg-slate-400 hover:bg-opacity-20 p-3 pl-5 cursor-pointer">
                    Compras
                </li>
                
                <li @click="selected = 'sales'" class="text-lg text-gray-700 hover:bg-slate-400 hover:bg-opacity-20 p-3 pl-5 cursor-pointer">
                    Ventas
                </li>

                <li @click="selected = 'products'" class="text-lg text-gray-700 hover:bg-slate-400 hover:bg-opacity-20 p-3 pl-5 cursor-pointer">
                    Productos
                </li>

                <li @click="selected = 'users'" class="text-lg text-gray-700 hover:bg-slate-400 hover:bg-opacity-20 p-3 pl-5 cursor-pointer">
                    Usuarios
                </li>

                <li @click="selected = 'all-users'" class="text-lg text-gray-700 hover:bg-slate-400 hover:bg-opacity-20 p-3 pl-5 cursor-pointer">
                    Todos los usuarios
                </li>
            </ul>
        </div>

        <div class="p-6 h-full w-full flex justify-center">
            <AccountSettings v-if="selected === 'account'"/>
            <AccountPurchases v-if="selected === 'purchases'"/>
            <AccountSales v-if="selected === 'sales'"/>
            <AccountProducts v-if="selected === 'products'"/>
            <AccountUsers v-if="selected === 'users'"/>
            <AccountAllUsers v-if="selected === 'all-users'"/>
        </div>
    </div>
</template>

<script setup lang="ts">
const selected = ref('account')
</script>

<style scoped>
li + li {
    border-top: 1px solid #e5e7eb;
}
</style>