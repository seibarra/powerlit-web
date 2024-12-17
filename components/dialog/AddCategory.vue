<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="dialog" max-width="600">
            <v-card title="Agregar Categoría">
                <v-card-text>
                    <v-text-field label="Nombre" required v-model="name"></v-text-field>
            
                    <menu-image-selector></menu-image-selector>
                    
                    <v-file-input v-model="image" :show-size="1000" color="deep-purple-accent-4"
                        label="Imagen de la categoría" placeholder="Selecciona la imagen de la categoría"
                        prepend-icon="mdi-camera" variant="outlined">
                        <template v-slot:selection="{ fileNames }">
                            <template v-for="(fileName, index) in fileNames" :key="fileName">
                                <v-chip v-if="index < 2" class="me-2" color="deep-purple-accent-4" size="small" label>
                                    {{ fileName }}
                                </v-chip>
                            </template>
                        </template>
                    </v-file-input>
                    
                    <small v-if="errorMessage" class="text-red-500">{{ errorMessage }}</small>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions class="ma-3 mt-0">
                    <v-btn text="Cerrar" variant="plain" @click="dialog = false"
                        class="text-none font-weight-regular"></v-btn>

                    <v-spacer/>

                    <v-btn color="green" text="Crear producto" variant="tonal" @click="addCategory"
                        class="text-none font-weight-regular" :loading="loading"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const userStore = useUserStore()
const dialog = defineModel({ default: false, required: true })
const emit = defineEmits(['onAddCategory'])

const name = ref('')
const image = ref<File>()
const errorMessage = ref('')
const loading = ref(false)

async function addCategory() {
    if (loading.value) return
    if (!name.value || !image.value) {
        errorMessage.value = 'Completa los campos requeridos.'
        return
    }
    loading.value = true
    const { data, error } = await supabase.from('product_categories').insert({
        name: name.value,
        path: name.value.toLowerCase().replaceAll(' ', '-'),
        image: image.value ? image.value.name : ''
    }).select()

    if (error) {
        console.log(error.code, error.message)

        errorMessage.value = 'Error al crear la categoría.'
        loading.value = false
        return
    } else {
        emit('onAddCategory', data[0])
        dialog.value = false
    }
    loading.value = false
}
</script>