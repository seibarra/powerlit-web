<template>
    <div class="flex items-center justify-center mt-10">
        <section class="w-full p-8 bg-white rounded-lg shadow-lg">
            <header class="w-full border-b border-gray-200 mb-6">
                <h2 class="text-2xl font-bold p-3 max-sm:text-center text-gray-700">Contacto</h2>                
            </header>
            <div class="flex w-full max-sm:flex-col gap-5">
                <div class="max-w-[600px]">
                <p class="text-lg max-sm:text-center text-gray-500">
                    En Powerlit, brindamos soluciones completas para el manejo y conservación del agua, un recurso cada
                    vez más escaso y esencial. Nuestra misión es clara: "garantizar que todos accedan a más y mejor
                    agua." Con un enfoque en la calidad, el ahorro y la sostenibilidad, ofrecemos productos diseñados
                    para optimizar el uso y tratamiento del agua en los sectores de la construcción, agricultura e
                    industria.
                </p>
                <div class="mt-8 flex items-center max-sm:justify-center gap-3">
                    <v-btn icon color="primary" variant="tonal">
                        <v-icon>mdi-email</v-icon>
                    </v-btn>
                    <v-btn icon color="primary" variant="tonal">
                        <v-icon>mdi-google</v-icon>
                    </v-btn>
                    <v-btn icon color="primary" variant="tonal">
                        <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn icon color="primary" variant="tonal">
                        <v-icon>mdi-whatsapp</v-icon>
                    </v-btn>
                </div>
            </div>


                <form class="min-w-[300px] w-full" @submit.prevent="submit">
                    <div class="flex gap-4">
                    <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
                        label="Nombre"></v-text-field>

                    <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
                        label="Apellido"></v-text-field>
                    </div>
                    <div class="flex gap-4">
                    <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value"
                        label="Correo electrónico"></v-text-field>

                    <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
                        label="Empresa"></v-text-field>
                    </div>
                    <v-textarea label="Mensaje" variant="solo-filled"></v-textarea>

                    <v-btn class="me-4" type="submit">
                        Enviar
                    </v-btn>
                </form>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name(value: string) {
            if (value?.length >= 2) return true

            return 'Este campo es obligatorio.'
        },
        phone(value: string) {
            if (/^[0-9-]{7,}$/.test(value)) return true

            return 'El número de teléfono debe tener 7 dígitos.'
        },
        email(value: string) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

            return 'Debe ser un correo electrónico válido.'
        },
        select(value: any) {
            if (value) return true

            return 'Seleccione una opción.'
        },
        checkbox(value: any) {
            if (value === '1') return true

            return 'Debe aceptar los términos y condiciones para poder continuar.'
        },
    },
})
const name = useField('name')
const phone = useField('phone')
const email = useField('email')
const select = useField('select')
const checkbox = useField('checkbox')

const items = ref([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
])

const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
})
</script>