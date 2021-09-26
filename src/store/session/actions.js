import { supabase } from '../../supabase'

export default {

    async appInit( { commit }, payload ){
        supabase.auth.onAuthStateChange((_, session) => {
            if(session && session.user) commit("SET_USER", session.user)
        })
    },

    async login( { commit }, payload ){
        const { email, password } = payload;
        return supabase.auth.signIn({ email, password })
    },

    async logout ( { commit }, payload ){
        supabase.auth.signOut()
        commit("SET_USER", null)
    },

    async signUp( { commit }, payload ){
        const { email, password } = payload
        return supabase.auth.signUp( { email, password } )
    }

}