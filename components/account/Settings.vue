<template>
    <section class="max-w-[900px] w-full">
        <header class="flex justify-between items-center">
            <h2 class="text-2xl font-bold px-5 pb-7">Datos de la cuenta</h2>
        </header>
        <form @submit.prevent="submitForm" class="flex flex-col gap-5">
            <div class="flex gap-5">
                <v-text-field label="Nombre" variant="solo-filled" v-model="name.value.value" :error-messages="name.errorMessage.value"></v-text-field>
                <v-text-field label="Apellido" variant="solo-filled" v-model="lastname.value.value" :error-messages="lastname.errorMessage.value"></v-text-field>
            </div>
            <v-text-field label="Correo electrónico" variant="solo-filled" v-model="email.value.value" :error-messages="email.errorMessage.value"></v-text-field>
            <v-text-field label="Número de teléfono" variant="solo-filled" v-model="phonenumber.value.value" :error-messages="phonenumber.errorMessage.value"></v-text-field>
            <v-btn color="green" variant="tonal" type="submit" :loading="loading">Guardar</v-btn>
        </form>
    </section>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const initialValues = {
    name: userStore.user?.name,
    lastname: userStore.user?.lastname,
    email: userStore.user?.email,
    phonenumber: userStore.user?.phonenumber?.number ?? ''
}

const { handleSubmit } = useForm({
  initialValues,
})

const name = useField('name')
const lastname = useField('lastname')
const email = useField('email')
const phonenumber = useField('phonenumber')

const loading = ref(false)

const submitForm = handleSubmit(async (values) => {
  loading.value = true
  const supabase = useSupabaseClient()
  const userResponse = await supabase.auth.getUser()



  if (userResponse.data.user) {
    const response = await supabase.from('users').update({
      name: values.name,
      lastname: values.lastname,
      email: values.email,
      phonenumber: { number: values.phonenumber, country_code: '54' },
    }).eq('uid', userResponse.data.user?.id)

    if (response.error) {
      console.log("Error al actualizar el usuario:", response.error)
    }
  }
  loading.value = false
})
</script>