export default {
    login(state, token) {
        state.token = token
        localStorage.setItem('token', token)
    },
    logout(state) {
        state.token = null
        localStorage.removeItem('token')
    },
    setRedirect(state, redirect) {
        state.redirect = redirect
    }
}