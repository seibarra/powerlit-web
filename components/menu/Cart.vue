<template>
    <div class="relative">
        <v-btn icon color="primary" variant="tonal" class="text-none">
            <v-icon>mdi-cart</v-icon>
        </v-btn>
                        
        <v-menu activator="parent" v-model="cartModel" :close-on-content-click="false">
            <v-card class="overflow-y-auto" max-width="580" width="100%">
                <v-card-text>
                    <h2 class="text-2xl p-5 border-b border-gray-200">Mi carrito</h2>
                    <v-list max-height="410">
                        <v-list-item v-for="product in userStore.cart" :key="product.productId">
                            <div class="flex">
                                <NuxtImg :src="productById(product.productId)?.imagesURLs[0]" class="w-24 h-24 rounded-md" />
                                <div class="my-auto ml-3 w-full">
                                    <h3 class="text-lg">{{ productById(product.productId)?.name ?? 'Producto eliminado' }}</h3>
                                    <p class="text-md">{{ productById(product.productId)?.shortDescription ?? '' }}</p>
                                    <div class="flex mt-2 justify-between">
                                        <v-number-input
                                            control-variant="split"
                                            v-model="product.quantity"
                                            :min="1"
                                            variant="outlined"
                                            density="compact"
                                            max-width="150"
                                        />

                                        <v-btn @click="userStore.removeFromCart(product.productId)"
                                        class="text-none" color="primary" variant="text">Eliminar</v-btn>
                                    </div>
                                </div>
                            </div>


                        </v-list-item>
                    </v-list>
                </v-card-text>
        
                <v-card-actions>
                    <v-spacer/>
                    <v-btn class="text-none mr-3" color="primary" variant="flat" @click="checkout()">Comprar carrito</v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
        <div class="absolute bottom-0 right-0 w-4 h-4 flex justify-center items-center rounded-full bg-green-700 text-white text-xs">{{ numberProductsOnCart }}</div>
    </div>
</template>

<script setup lang="ts">
import { VNumberInput } from 'vuetify/labs/components'
const userStore = useUserStore()
const prouductsStore = useProductsStore()
const {cartModel} = storeToRefs(userStore)

const numberProductsOnCart = computed(() => {
    return userStore.cart.reduce(
  (accumulator, currentValue) => accumulator + currentValue.quantity,0)
})

function productById(id: number) {
    const product = prouductsStore.products.find(product => product.id === id)
    if (!product) {
        userStore.removeFromCart(id)
    } else {
        return product
    }
}

function checkout() {
}
</script>