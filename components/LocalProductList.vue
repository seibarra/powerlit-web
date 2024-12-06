<template>
  <section>
    <header class="flex gap-5 my-5 mr-10">
      <v-btn color="#ffebc9ee" class="text-none" @click="selectable = !selectable; selected = [];">
        {{!selectable ? 'Seleccionar' : 'Deseleccionar'}}
      </v-btn>
      <v-btn 
      v-if="selected.length > 0" 
      color="red" min-width="40" max-width="40"
      @click="showDeleteProductsDialog = true"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </header>
    <div class="flex flex-wrap gap-4">
      <v-card v-if="!loading" v-for="(product, index) in products" :key="index"
       :width="cardSize" 
       link
       @click="handleClickCard(product)"
       :class="{ 'card-selectable': selectable, 'card-selected': selected.includes(product.id) }"
       >
        <div class="flex justify-center items-center p-1">
          <NuxtImg :src="product.imagesURLs[0]" class="object-cover max-w-[100%] max-h-[100%]" />
        </div>
        <h2 class="font-bold px-3">{{ product.name }}</h2>
        <p class="text-[16px] font-medium px-3">${{ product.price }}</p>
      </v-card>
      <v-skeleton-loader v-else type="card" v-for="(item) in [0,1,2,3,4,5,6,7,8,9,10,11]" :key="item" :width="cardSize" ></v-skeleton-loader>
    </div>

    <DialogDeleteProducts v-model="showDeleteProductsDialog" :products="products.filter((product) => selected.includes(product.id))" @onDeleteProducts="emit('onDeleteProducts', $event)" />
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types/entities';
const selectable = ref(false)
const selected = ref<Number[]>([])
const showDeleteProductsDialog = ref(false)

const emit = defineEmits(['onDeleteProducts'])

const props = defineProps({
    products: {
        type: Array<Product>,
        required: true
    },
    cardSize: {
        type: Number,
        default: 200
    },
    loading: {
        type: Boolean,
        default: false
    }
})

function handleClickCard(product: Product) {
  if (selectable.value) {
    if (selected.value.includes(product.id)) {
      selected.value.splice(selected.value.indexOf(product.id), 1)
    } else {
      selected.value.push(product.id)
    }
  } else {
    navigateTo(`/productos/edit/${product.id}`)
  }
}


</script>

<style>
.card-selectable {
  border: 2px solid #ffebc9ee;
}

.card-selected {
  background-color: #ffebc944;
  box-shadow: 0 0 12px rgb(0 0 0 / 0.5);
}
</style>