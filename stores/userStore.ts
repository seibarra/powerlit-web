import { piniaPluginPersistedstate } from '#imports'
import type { User, Address } from '~/types/entities'

export const useUserStore = defineStore('userStore', () => {
    const user = ref<User | null>(null)
    const cart = ref<{ productId: number, quantity: number }[]>([])
    const addresses = ref<Address[]>([])
    const cartModel = ref(false)

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

        getAddresses()
    })

    function logout() {
        const supabase = useSupabaseClient()
        supabase.auth.signOut()
        user.value = null
        navigateTo('/login')
    }

    async function getAddresses() {
        const supabase = useSupabaseClient()
        if (!user.value) return
        const { data, error } = await supabase.from('addresses').select().eq('uid', user.value.uid)
        if (error) {
            console.log('error:', error)
        } else {
            addresses.value = data as Address[]
        }
    }

    function addEmptyAddress() {
        if (!user.value) return
        addresses.value.push({
            uid: user.value.uid,
            province: '',
            city: '',
            zip: '',
            street: '',
            id: undefined
        })
    }

    async function saveAddress(addressIndex: number) {
        const supabase = useSupabaseClient()
        if (!user.value) return
        if (addresses.value[addressIndex].id) {
            const { error } = await supabase.from('addresses').upsert(addresses.value[addressIndex]).eq('id', addresses.value[addressIndex].id)
            if (error) {
                console.log('error:', error)
            }
        } else {
            const { data, error } = await supabase.from('addresses').insert(addresses.value[addressIndex])
            .eq('uid', user.value.uid).select().single()
            if (error) {
                console.log('error:', error)
            } else {
                addresses.value[addressIndex].id = data?.id
            }
        }
    }

    async function deleteAddress(addressIndex: number) {
        const supabase = useSupabaseClient()
        const addressId = addresses.value[addressIndex].id
        if (!addressId) return

        await supabase.from('addresses').delete().eq('id', addressId)
        addresses.value.splice(addressIndex, 1)
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
        cart,
        cartModel,
        addToCart,
        removeFromCart,
        setQuantity,
        addresses,
        addEmptyAddress,
        saveAddress,
        deleteAddress
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

