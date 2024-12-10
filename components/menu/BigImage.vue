<template>
    <v-menu v-model="model" transition="false">
        <v-card rounded="lg" width="310">
            <v-card-title class="text-wrap">
                {{ fileName }}
            </v-card-title>
            <v-card-text>
                <NuxtImg :src="src" width="350" height="350" class="object-cover rounded-md" />
            </v-card-text>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
const model = defineModel({type: Boolean, default: false})
const props = defineProps({
    src: {
        type: String,
        required: true
    }
})

const fileName = computed(() => props.src.split('/').pop())
</script>