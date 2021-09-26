import actions from './actions'
import mutations from './mutations'

const session = {

    state: () => ({
        user: null
    }),
    actions,
    mutations,
    namespaced: true

}

export default session