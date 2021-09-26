import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes'
import guards from './guards'

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach(guards)

export default router