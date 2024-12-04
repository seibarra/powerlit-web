import { piniaPluginPersistedstate } from '#imports'
import type { Product, ProductCategory } from '~/types/entities'

export const useProductsStore = defineStore('productsStore', () => {
    const products = ref<Product[]>([])
    const productCategories = ref<ProductCategory[]>([])

    onMounted(async () => {
        await getProductCategories()
        await getProducts()
    })

    async function getProductCategories() {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase.from('product_categories').select()
        if (error) {
            console.log('error:', error)
        } else {
            productCategories.value = data as ProductCategory[]
        }
    }

    async function getProducts() {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase.from('products').select()
        if (error) {
            console.log('error:', error)
        } else {
            products.value = data as Product[]
        }
    }

    return {
        products,
        productCategories
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

