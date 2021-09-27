<template>
    <form class="w-full" method="POST" action ="/login" @submit.prevent="handleLogin">
        <div class="text-2xl py-4">Authentication</div>
        <div v-if="state.error" class="bg-red-500 text-red-100 rounded p-4 my-2">
            {{ state.error }}
        </div>
        <div class="flex flex-col mb-3">
            <label class="mb-1 text-gray-500 text-sm font-semibold">Email</label>
            <input type="email" v-model="state.email" @keydown="state.error=null" class="p-2 border-2 rounded" required/>
        </div>
        <div class="flex flex-col mb-3">
            <div class="flex flex-row justify-between mb-1 text-gray-500 text-sm font-semibold">
                <label>Password</label>
                <router-link class="text-blue-500 hover:underline" :to="{ name: 'recover' }" tabindex="-1">Forgot?</router-link>
            </div>
            <input type="password" v-model="state.password" @keydown="state.error=null" class="p-2 border-2 rounded" required/>
        </div>
        <div class="mb-3">
            <button class="w-full md:w-auto p-4 bg-green-500 text-green-100 rounded font-bold disabled:opacity-50" type="submit" :disabled="state.loader">SIGN IN</button>
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
    state.loader = true, state.error = null
    store.dispatch("session/login", { email: state.email, password: state.password }, { root: true })
        .then(response => {
            console.log({ response })
            if(response.error){
                state.error = response.error.message
            } else {
                router.push(redirect)
            }
        })
        .catch(err => {
            state.error = err
        })
        .finally(()=>{
            state.loader = false
            state.password = ""
        })
}


</script>