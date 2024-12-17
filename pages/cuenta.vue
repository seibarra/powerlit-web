<template>
    <div class="flex h-full w-screen">
        <div class="flex">
            <div :class="openDrawer ? 'open-drawer' : 'closed-drawer'" class="whitespace-nowrap max-sm:absolute md:max-w-[235px] bg-white border-r-2 border-gray-200 shadow-[5px_2px_10px_-2px_rgba(0,0,0,0.10)] z-10">
                <ul class="flex flex-col p-3">
                    <li @click="handleClickTab('cuenta')" class="text-lg text-gray-700 hover:bg-slate-400 hover:bg-opacity-20 p-3 pl-5 cursor-pointer">
                        Cuenta
                    </li>

                    <li @click="handleClickTab('compras')" class="text-lg text-gray-700 hover:bg-slate-400 hover:bg-opacity-20 p-3 pl-5 cursor-pointer">
                        Compras
                    </li>
                    
                    <li @click="handleClickTab('ventas')" class="text-lg text-gray-700 hover:bg-slate-400 hover:bg-opacity-20 p-3 pl-5 cursor-pointer">
                        Ventas
                    </li>

                    <li @click="handleClickTab('productos')" class="text-lg text-gray-700 hover:bg-slate-400 hover:bg-opacity-20 p-3 pl-5 cursor-pointer">
                        Productos
                    </li>

                    <li @click="handleClickTab('usuarios')" class="text-lg text-gray-700 hover:bg-slate-400 hover:bg-opacity-20 p-3 pl-5 cursor-pointer">
                        Usuarios
                    </li>

                    <li @click="handleClickTab('todos-los-usuarios')" class="text-lg text-gray-700 hover:bg-slate-400 hover:bg-opacity-20 p-3 pl-5 cursor-pointer">
                        Todos los usuarios
                    </li>
                </ul>
            </div>
            <div class="drawer-bar h-full w-3 bg-gray-200 flex items-center cursor-pointer" @click="openDrawer = !openDrawer">
            </div>
        </div>

        <div class="p-6 h-full w-full flex flex-col items-center">
            <AccountSettings v-if="selected === 'cuenta'"/>
            <AccountPurchases v-if="selected === 'compras'"/>
            <AccountSales v-if="selected === 'ventas'"/>
            <AccountProducts v-if="selected === 'productos'"/>
            <AccountUsers v-if="selected === 'usuarios'"/>
            <AccountAllUsers v-if="selected === 'todos-los-usuarios'"/>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const selected = ref(route.query.tab ?? 'cuenta')
const openDrawer = ref(true)
const queryStrings = ['cuenta', 'compras', 'ventas', 'productos', 'usuarios', 'todos-los-usuarios']
onMounted(() => {
    if (route.query && queryStrings.includes(route.query.tab as string)) {
        selected.value = route.query.tab as string
    } else {
        history.pushState({}, '', '/cuenta?tab='+selected.value)
    }
})

function handleClickTab(tab: string) {
    selected.value = tab
    history.pushState({}, '', `/cuenta?tab=${tab}`)
}
</script>

<style scoped>
li + li {
    border-top: 1px solid #e5e7eb;
}

.closed-drawer {
    width: 0;
    transition: width 0.3s ease-in-out;
    overflow: hidden;
}

.open-drawer {
    width: 235px;    
    transition: width 0.3s ease-in-out;
    overflow: hidden;
}
</style>