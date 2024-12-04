import { piniaPluginPersistedstate } from '#imports'
import type { User } from '~/types/entities'

export const useUserStore = defineStore('userStore', () => {
    const user = ref<User | null>(null)
    const cart = ref<{ productId: number, quantity: number }[]>([])
    const cartModel = ref(false)

    function setUser(newUser: User) {
        user.value = newUser
    }

    onMounted(async () => {
        const supabase = useSupabaseClient()
        const response = await supabase.auth.getUser()
        if (response.data && response.data.user) {
            const { data, error } = await supabase.from('users').select().eq('uid', response.data.user.id).single()
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

    function addToCart(productId: number, quantity: number) {
        const index = cart.value.findIndex((item) => item.productId === productId)
        if (index === -1) {
            cart.value.push({ productId, quantity })
        } else {
            cart.value[index].quantity += quantity
        }
        cartModel.value = true
    }

    function removeFromCart(productId: number) {
        const index = cart.value.findIndex((item) => item.productId === productId)
        if (index !== -1) {
            cart.value.splice(index, 1)
        }
    }

    function setQuantity(productId: number, quantity: number) {
        const index = cart.value.findIndex((item) => item.productId === productId)
        if (index !== -1) {
            cart.value[index].quantity = quantity
        }
    }

    return {
        user,
        logout,
        setUser,
        cart,
        cartModel,
        addToCart,
        removeFromCart,
        setQuantity
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

