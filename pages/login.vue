<template>
    <div class="mt-10">
      <section class="w-full mx-auto p-8 bg-white rounded-lg shadow-xl">
        <header>
            <h2 class="text-2xl font-bold text-center text-gray-700">Iniciar sesión</h2>
        </header>
        
        <form class="mt-8 space-y-4">
          <div>
            <label class="ml-3 block text-sm font-medium text-gray-600" for="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="email"
            />
          </div>
  
          <div>
            <label class="ml-3 block text-sm font-medium text-gray-600" for="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="password"
            />
          </div>
  
          <v-btn @click="loginWithEmail" color="primary" block variant="elevated" class="text-none" :loading="loading">
            Entrar
          </v-btn>
          <small class="text-red-400" v-if="errorMessage">{{ errorMessage }}</small>
        </form>

        <!-- Google Sign-In -->
        <div class="mt-4 w-full flex items-center justify-center">
            <button @click="loginWithEmail" class="flex items-center justify-center shadow-sm p-3 shadow-gray-500 rounded-lg transition-shadow ease-in-out hover:shadow-md hover:shadow-gray-400">
                <svg aria-hidden="true" class="native svg-icon iconGoogle" width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18"></path><path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17"></path><path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z"></path><path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.8 4.8 0 0 1 4.48-3.3"></path></svg>
                <span class="text-sm ml-3 text-gray-500">Continuar con Google</span>
            </button>
        </div>
  
        <p class="text-sm text-center mt-5 text-gray-500">
          ¿No tienes una cuenta?
          <a @click="showRegisterDialog = true" class="font-medium text-blue-500 hover:underline cursor-pointer">Registrarse</a>
        </p>
        <p class="text-sm text-center text-gray-500">
          ¿Olvidaste tu contraseña?
          <a href="/register" class="font-medium text-blue-500 hover:underline">Recuperar contraseña</a>
        </p>        
      </section>

      <DialogSignUp v-model="showRegisterDialog" />
    </div>
  </template>
  
  <script setup lang="ts">
  const supabase = useSupabaseClient()
  const email = ref('')
  const password = ref('')
  const showRegisterDialog = ref(false)
  const loading = ref(false)
  const errorMessage = ref('')

  const loginWithEmail = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
      if (error) {
        console.log('error on login with email and password:', error.code)
        
        if (error.code === 'email_not_confirmed') {
          errorMessage.value = 'El correo electrónico no ha sido confirmado. Por favor, verifica tu correo electrónico.'
          supabase.auth.resend({ type: 'signup', email: email.value })
        } else if (error.code === 'invalid_credentials') {
          errorMessage.value = 'Correo electrónico o contraseña incorrectos.'
        } else if (error.code === 'user_not_found') {
          errorMessage.value = 'No se ha encontrado el usuario con ese correo electrónico.'
        }
      } else {
        const userStore = useUserStore()
        const response = await supabase.from('users').select('*').eq('uid', data.user.id).single()
        
        navigateTo('/cuenta')
      }
    } catch (error) {
      console.log('error on login with email and password:', error)
    }
    loading.value = false
  }

  const loginWithGoogle = async () => {
    
  }
</script>