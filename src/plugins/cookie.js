// cookie's name and value with no ';' and ',' and '=' and space

const cookie = {
    install(Vue) {
        Vue.prototype.$cookie = {
            set(name, val, expires = false, path = false) {
                name = escape(name)
                val = escape(val)
                const data = [
                    `${name}=${val}`
                ]
                if (expires) {
                    data.push(`expires=${expires.toGMTString()}`)
                }
                if (path) {
                    data.push(`path=${path}`)
                }
                document.cookie = data.join('; ')
            },
            get(name) {
                name = escape(name)
                const reg = new RegExp(name + '=([^;]+)')
                const match = document.cookie.match(reg)
                return match ? unescape(match[1]) : ''
            },
            remove(name) {
                const expires = new Date()
                expires.setDate(expires.getDate() - 1)
                this.set(name, '', expires)
            }
        }
    }
}

export default cookie