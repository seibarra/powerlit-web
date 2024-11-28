<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-delete"
        title="Eliminar productos"
        text="¿Estás seguro de que quieres eliminar los productos seleccionados?"
      >
        <v-card-text>
            <p>Se eliminarán los siguientes productos:</p>
            <ul>
                <li v-for="(product, index) in products" :key="index"><span class="text-tahiti-500">{{ product.category ?? 'Sin categoría' }}</span>: {{ product.name }}</li>
            </ul>
        </v-card-text>

      <v-card-actions>
          <v-btn
            class="ms-auto text-none"
            text="Cerrar"
            variant="tonal"
            @click="dialog = false"
            width="90"
          ></v-btn>

          <v-spacer></v-spacer>

          <v-btn
            class="ms-auto text-none"
            color="red"
            variant="flat"
            text="Eliminar"
            width="90"
            @click="emit('onDeleteProducts', products); dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/entities';
const dialog = defineModel({ default: false, required: true })

defineProps({
    products: {
        type: Array<Product>,
        required: true
    }
})

const emit = defineEmits(['onDeleteProducts'])
</script>