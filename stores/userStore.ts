import { defineStore } from 'pinia'
import { piniaPluginPersistedstate } from '#imports'
import type User from '~/models/user'

export const useUserStore = defineStore('userStore', () => {
    const user = ref<User | null>(null)    

    function setUser(newUser: User) {
        user.value = newUser
    }

    onMounted(async () => {
        const supabase = useSupabaseClient()
        const response = await supabase.auth.getUser()
        if (response.data && response.data.user) {
            const { data, error } = await supabase.from('users').select('*').eq('uid', response.data.user.id).single()
            if (error) {
                console.log('error on get user:', error)
            } else {
                user.value = data as User
            }
        }
    })

    function logout() {
        const supabase = useSupabaseClient()
        supabase.auth.signOut()
        user.value = null
        navigateTo('/login')
    }

    return {
        user,
        logout,
        setUser
    }
}, 
{
    persist: {
        storage: piniaPluginPersistedstate.cookies({
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30, // 30 days
        })
    }
}
)

