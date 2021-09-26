<template>
    <form method="POST" action ="/login" @submit.prevent="handleLogin">
        <div>Login</div>
        <div>
            <label>Email</label>
            <input type="email" v-model="state.email" required/>
        </div>
        <div>
            <label>Password</label><router-link :to="{ name: 'recover' }">Forgot?</router-link>
            <input type="password" v-model="state.password" required/>
        </div>
        <div>
            <button type="submit" :disabled="state.loader">Login</button>
        </div>
    </form>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()
const state = reactive({
    email: "",
    password: "",
    sent: false,
    loader: false,
    error: null
})

const redirect = computed( () => route.query.redirect || '/')

const handleLogin = () => {
    state.loader = true
    store.dispatch("session/login", { email: state.email, password: state.password }, { root: true })
        .then(response => {
            router.push(redirect)
        })
        .catch(err => {
            state.error = err
        })
        .finally(()=>{
            state.loader = false
        })
}


</script>