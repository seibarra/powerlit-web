<template>
    <footer class="flex justify-center items-center px-5 bg-beige">
        <nav class="w-full flex justify-around items-center max-w-[1920px] mx-auto p-8  max-sm:flex-col gap-5">
            <NuxtLink to="/">
                <NuxtImg src="/images/powerlit_logo.webp" alt="Powerlit Logo" class="min-w-[160px]" />
            </NuxtLink>
            <div class="flex max-sm:flex-col gap-3">
            <ul class="flex justify-self- items-center px-5 gap-5 text-lg text-tahiti-600">
                <li>
                    <v-btn @click="handleClickEmail" icon color="#333" variant="tonal">
                        <v-icon>mdi-email</v-icon>
                    </v-btn>
                </li>
                <li>
                    <v-btn @click="handleClickPhone" icon color="#333" variant="tonal">
                        <v-icon>mdi-phone</v-icon>
                    </v-btn>
                </li>
                <li>
                    <v-btn @click="handleClickFacebook" icon color="#333" variant="tonal">
                        <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                </li>
                <li>
                    <v-btn @click="handleClickWhatsapp" icon color="#333" variant="tonal">
                        <v-icon>mdi-whatsapp</v-icon>
                    </v-btn>
                </li>
            </ul>
        </div>
        </nav>
    </footer>
</template>

<script setup lang="ts">

function handleClickEmail() {
    window.open('mailto:comercial.powerlit@gmail.com', '_blank')
}

function handleClickPhone() {
    window.open('tel:+5491164743375', '_blank')
}

function handleClickFacebook() {
    window.open('https://www.facebook.com/ZonoConstruccion', '_blank')
}

function handleClickWhatsapp() {
    window.open('https://api.whatsapp.com/send/?phone=541164743375&text=Hola+te+hablo+desde+el+sitio+web%20de%20Powerlit', '_blank')
}
</script>