<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="dialog" max-width="600">
            <v-card title="Agregar producto">
                <v-card-text>
                    <v-text-field label="Nombre" required v-model="name"></v-text-field>
                    <v-textarea label="Descripción corta" v-model="shortDescription" auto-grow rows="2"></v-textarea>
                    <v-textarea label="Descripción" v-model="description" auto-grow rows="2"></v-textarea>
                    <v-combobox label="Categoría" :items="categories" chips
                        v-model="selectedCategory">
                        <template v-slot:no-data>
                            <v-list-item>
                                <v-list-item-title>
                                    <span>No hay categorías disponibles</span>
                                </v-list-item-title>
                            </v-list-item>
                        </template>
                        <template v-slot:item="{ item }">
                            <v-list-item @click="auxCategory = item.value; selectedCategory = item.value">
                                <div class="flex items-center">
                                    <v-list-item-title>
                                        <span>
                                            {{ item.value }}
                                        </span>
                                    </v-list-item-title>
                                    <v-spacer/>
                                    <v-btn size="small" variant="text" icon @click="deleteCategory(item.value)">
                                        <v-icon class="opacity-45">mdi-delete</v-icon>
                                    </v-btn>
                                </div>
                            </v-list-item>
                        </template>
                    </v-combobox>
                    <v-combobox label="Tags" :items="tags.filter((e) => !selectedTags.includes(e))"
                        v-model="selectedTags" multiple chips @input="auxTag = $event.target.value"
                         @update:model-value="console.log($event)" auto-select-first>
                        <template v-slot:no-data>
                            <v-list-item>
                                <v-list-item-title>
                                    No hay tags disponibles
                                </v-list-item-title>
                            </v-list-item>
                        </template>
                        <template v-slot:item="{ item }">
                            <v-list-item @click="auxTag = item.value; selectedTags.push(item.value)">
                                <div class="flex items-center">
                                    <v-list-item-title>
                                        <span>
                                            {{ item.value }}
                                        </span>
                                    </v-list-item-title>
                                    <v-spacer/>

                                    <v-btn size="small" variant="text" icon @click="deleteTag(item.value)">
                                        <v-icon class="opacity-45">mdi-delete</v-icon>
                                    </v-btn>
                                </div>
                            </v-list-item>
                        </template>
                    </v-combobox>
                    <v-text-field label="Precio" required type="number" v-model="price"></v-text-field>
                    <v-text-field label="Capacidad" type="number" v-model="capacity"></v-text-field>

                    <menu-image-selector @onSelectImages="selectedImagesByIndex = $event"></menu-image-selector>
                    
                    <div v-if="selectedLocalImagesURLs.length > 0" class="flex gap-5 w-full my-4">
                        <div 
                        v-for="(image, index) in selectedLocalImagesURLs" :key="index" 
                        class="border-2 border-slate-500 rounded-lg p-2 max-w-[90px] max-md:max-w-[60px] cursor-pointer hover:bg-slate-100 relative"
                        draggable="true"
                        @dragstart="onDragStart(index)"
                        @dragover.prevent="onDragOver(index)"
                        @dragend="onDragEnd"
                        >
                            <NuxtImg :src="image" width="270" class="mx-auto object-cover" />                            
                        </div>
                    </div>

                    <small v-if="errorMessage" class="text-red-500">{{ errorMessage }}</small>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions class="ma-3 mt-0">
                    <v-btn text="Cerrar" variant="plain" @click="dialog = false"
                        class="text-none font-weight-regular"></v-btn>

                    <v-spacer/>

                    <v-btn color="green" text="Crear producto" variant="tonal" @click="addProduct"
                        class="text-none font-weight-regular" :loading="loading"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
const localImages = getProductImagePaths()
const supabase = useSupabaseClient()
const userStore = useUserStore()
const dialog = defineModel({ default: false, required: true })
const emit = defineEmits(['onAddProduct'])
const categories = ref<string[]>([])
const tags = ref<string[]>([])

const name = ref('')
const shortDescription = ref('')
const description = ref('')
const auxCategory = ref('')
const selectedCategory = ref<string | null>(null)
const auxTag = ref('')
const selectedTags = ref<string[]>([])
const capacity = ref('0')
const price = ref('0')
const images = ref<File[]>([])
const loading = ref(false)
const errorMessage = ref('')
const loadingData = ref(false)
const selectedImagesByIndex = ref<number[]>([])


const selectedLocalImagesURLs = computed(() => selectedImagesByIndex.value.map((index) => localImages[index]))
// const filesSize = computed(() => Math.round(images.value.reduce((acc, file) => acc + (file.size / 1024), 0)))

onMounted(async () => {
    loadingData.value = true
    try {
        const { data, error } = await supabase.from('product_categories').select()
        if (!error) {
            categories.value = data.map((item) => item.name)
        }
    } catch (error) {
        console.log(error)
    }

    try {
        const { data, error } = await supabase.from('tags').select()
        if (!error) {
            tags.value = data.map((item) => item.name)
        }
    } catch (error) {
        console.log(error)
    }
})

async function createCategory() {
    if (selectedCategory.value && !categories.value.includes(selectedCategory.value)) {
        categories.value.push(selectedCategory.value)
        await supabase.from('product_categories').insert({
            name: selectedCategory.value,
            path: selectedCategory.value.toLowerCase().replaceAll(' ', '-')
        })
    }
}

async function deleteCategory(name: string) {
    try {
        await supabase.from('product_categories').delete().eq('name', name)
        categories.value = categories.value.filter((e) => e !== name)
    } catch {
        console.log('Error al eliminar categoría.')
    }
}

async function createTags() {
    await Promise.all(selectedTags.value.map(async (tag) => {
        if (!tags.value.includes(tag)) {
            console.log(tags, tag);
            tags.value.push(tag)
            
            await supabase.from('tags').insert({
                name: tag,
            })
        }
    }))
}

async function deleteTag(name: string) {
    try {
        await supabase.from('tags').delete().eq('name', name)
        tags.value = tags.value.filter((e) => e !== name)
    } catch {
        console.log('Error al eliminar tag.')
    }
}

async function uploadImages() {
    return await Promise.all(images.value.map(async (image, index) => {
        const fileName = `image_${new Date().getTime()}${index}`
        console.log(fileName)
        
        const { data, error } = await supabase.storage.from('products').upload(fileName, image)
        if (!error) {
            return data.path
        } else {
            return ''
        }
    }))
}

async function addProduct() {
    if (loading.value) return
    loading.value = true

    // const imagePaths = await uploadImages()
    
    // const imageURLs = imagePaths.map((path) => supabase.storage.from('products').getPublicUrl(path).data.publicUrl)

    await createCategory()
    if (selectedTags.value.length > 0)
        await createTags()


    const product = {
        name: name.value,
        shortDescription: shortDescription.value,
        description: description.value,
        category: selectedCategory.value,
        imagesURLs: selectedLocalImagesURLs.value,
        imagesPaths: [],
        price: parseFloat(price.value),
        capacity: parseFloat(capacity.value),
        createdBy: {
            email: userStore.user?.email,
            name: `${userStore.user?.name} ${userStore.user?.lastname}`,
            createdAt: new Date().toISOString()
        }
    }
    
    const { data, error } = await supabase.from('products').insert(product).select()

    if (error) {
        console.log(error.code, error.message)

        errorMessage.value = 'Error al crear el producto.'
        loading.value = false
        return
    } else {
        await Promise.all(selectedTags.value.map(async (tag) => {
            await supabase.from('product_tags').insert({
                productId: data[0].id,
                tag,
            })
        }))
        emit('onAddProduct', data[0])
        dialog.value = false
    }
    loading.value = false
}

const draggedIndex = ref<number | null>(null);

const onDragStart = (index: number) => {
    draggedIndex.value = index;
}

const onDragEnd = () => {
  draggedIndex.value = null; // Reset the dragged index when dragging ends
}

const onDragOver = (hoverIndex: number) => {
      if (draggedIndex.value !== hoverIndex && draggedIndex.value !== null) {
        const draggedImage = selectedImagesByIndex.value[draggedIndex.value]
        if (draggedImage) {
            selectedImagesByIndex.value.splice(draggedIndex.value, 1)
            selectedImagesByIndex.value.splice(hoverIndex, 0, draggedImage)
        }
        draggedIndex.value = hoverIndex; // Update the dragged index
      }
}
</script>