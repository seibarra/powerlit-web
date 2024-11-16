<template>
    <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account"
        title="Crear cuenta de Powerlit"
      >
        <v-card-text>
          
              <v-text-field
                label="Nombre*"
                required
                v-model="name"
              ></v-text-field>
              <v-text-field
                label="Apellido*"
                v-model="lastName"
              ></v-text-field>

              <v-text-field
                label="Correo electrónico*"
                type="email"
                required
                v-model="email"
              ></v-text-field>

              <v-text-field
                label="Contraseña*"
                type="password"
                required
                v-model="password"
              ></v-text-field>

          <small class="text-caption text-medium-emphasis">* Indica que campos son obligatorios.</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
          text="Cerrar"
          variant="plain"
          @click="dialog = false"
          class="text-none font-weight-regular"
          ></v-btn>
          
          <v-spacer></v-spacer>

          <v-btn
            color="green"
            text="Crear cuenta"
            variant="tonal"
            @click="registerWithEmail"
            class="text-none font-weight-regular"
            :loading="registering"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const dialog = defineModel({ default: false, required: true })
const name = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const registering = ref(false)
const errorMessage = ref('')

const registerWithEmail = async () => {
    if (registering.value) return
    registering.value = true
    try {
      const { data, error } = await supabase.auth.signUp({ email: email.value, password: password.value, options: { data: { name: name.value, last_name: lastName.value } } })
      if (error) {
        console.log('error on register with email and password:', error)
        if (error.message.includes('email')) {
          errorMessage.value = 'El correo electrónico ya está registrado.'
        } else if (error.message.includes('password')) {
          errorMessage.value = 'La contraseña debe tener al menos 8 caracteres.'
        } else {
          errorMessage.value = 'Error al registrarse.'
        }
      } else {
        // @ts-ignore
        const {insertError} = await supabase.from('users').insert({ 
          name: name.value, 
          lastname: lastName.value, 
          email: email.value, 
          role: 'usuario',
        })
        if (insertError) {
          console.log('error on register with email and password:', insertError)
        }
        errorMessage.value = ''
        dialog.value = false
      }
    } catch (error) {
      console.log('error on register with email and password:', error)
    }
    registering.value = false
  }
</script>