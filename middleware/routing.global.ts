export default defineNuxtRouteMiddleware((to, from) => {
    const pathName = to.path
    
    if (pathName === '/productos') {
        return navigateTo('/productos/tanques-de-agua')
    }
    
    return
})