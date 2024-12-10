<template>
    <v-menu v-model="model" :close-on-content-click="false">
        <template #activator="{ props }">
            <v-btn variant="tonal" v-bind="props">
                Agregar imágenes
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="d-flex">
                <h2>Seleccionar imágenes del producto</h2>
                <v-spacer></v-spacer>
                <v-btn variant="text" icon @click="model = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="flex flex-wrap gap-3 max-w-[600px] max-h-[350px] overflow-y-auto">
                    <div v-for="image, index in images" :key="index"
                    @mouseenter="onMouseEnter(index)"
                    @mouseleave="onMouseLeave(index)"
                    class="relative"
                    :class="{ 'shadow-lg scale-110 ring-2 ring-orange-500': selectedImages.includes(index) }"
                    >
                        <NuxtImg
                            :src="image" 
                            width="65" height="65"
                            class="cursor-pointer hover:shadow-lg hover:scale-110 transition-all duration-300 rounded-sm"
                            @click="handleSelectImage(index)"
                        />
                        <div v-if="selectedImages.includes(index)" class="absolute bottom-0 right-0 w-4 h-4 flex justify-center items-center bg-orange-500 text-white text-xs">{{ selectedImages.indexOf(index) + 1  }}</div>
                        <MenuBigImage v-if="index === imageIndex" v-model="showBigImage" :src="image" />
                    </div>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary">
                    Seleccionar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
const model = ref(false)
const images = getProductImagePaths()
const selectedImages = ref<number[]>([])
const showBigImage = ref(false)
const imageIndex = ref(0)

function onMouseEnter(index: number) {
    imageIndex.value = index
    showBigImage.value = true
}

function onMouseLeave(index: number) {
    imageIndex.value = index
    showBigImage.value = false
}

function handleSelectImage(index: number) {
    if (selectedImages.value.includes(index)) {
        selectedImages.value = selectedImages.value.filter((e) => e !== index)
    } else {
        selectedImages.value.push(index)
    }
}
</script>