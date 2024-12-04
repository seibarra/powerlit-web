export default defineNuxtRouteMiddleware((to, from) => {
    const pathName = to.path
    
    if (pathName === '/c') {
        return navigateTo('/c/tanques-de-agua')
    }
    
    return
})