import { createStore } from 'vuex';
import session from './session'

const store = createStore({
    state: () => ({
        count: 0
    }),
    modules: {
        session
    }
})

export default store