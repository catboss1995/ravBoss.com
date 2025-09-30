import {
    createApp
} from 'vue'
import {
    createPinia
} from 'pinia'
import App from './App.vue'
import router from './router'
import './style.scss'

// 處理從 404.html 重定向過來的請求
const redirect = sessionStorage.redirect
delete sessionStorage.redirect
if (redirect && redirect !== location.href) {
    // 移除查詢參數
    const url = new URL(location.href)
    const params = new URLSearchParams(url.search)
    const path = params.get('p')

    if (path) {
        // 使用 router.replace 而不是 history.replaceState 來確保 Vue Router 知道路由變化
        history.replaceState(null, null, path)
    }

    if (redirect && redirect !== location.pathname) {
        history.replaceState(null, null, redirect);
    }
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')