<template>
    <form class="w-full" method="POST" action ="/" @submit.prevent="handleLogin">
        <div class="text-2xl py-4">Authentication</div>
        <zb-alert v-if="state.error" :message="state.error.message"/>
        <zb-alert v-if="state.sent" styles="bg-green-500 text-green-100" message="Check your email for the login link!"/>
        <template v-else>
            <zb-form-input label="Email" v-model="state.email" type="email" required/>
            <template v-if="!state.magicLink">
                <div class="flex flex-col mb-3">
                    <div class="flex flex-row justify-between mb-1 text-gray-500 text-sm font-semibold">
                        <label>Password</label>
                        <router-link class="text-blue-500 hover:underline" :to="{ name: 'recover' }" tabindex="-1">Forgot?</router-link>
                    </div>
                    <input type="password" v-model="state.password" @keydown="state.error=null" class="p-2 border rounded border-gray-400 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-20 focus:border-green-300" required/>
                </div>
                <div class="mb-3">
                    <zb-button type="submit" label="Sign in" styles="bg-green-500 text-green-100 focus:outline-none focus:border-none" :disabled="state.loader"/>
                </div>
            </template>
            <template v-else>
                <zb-button type="submit" label="SEND MAGIC LINK" styles="bg-green-500 text-green-100" :disabled="state.loader || state.sent"/>
            </template>
            <div class="mb-3 py-4 flex flex-col justify-center md:flex-row">
                <button type="button" class="text-sm text-green-500 p-2 hover:underline" @click="state.magicLink=!state.magicLink">
                    {{ state.magicLink ? "Sign in with password" : "Sign in with magic link" }}
                </button>
            </div>
        </template>
    </form>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import ZbAlert from '../../components/base/Alert.vue'
import ZbFormInput from '../../components/base/FormInput.vue'
import ZbButton from '../../components/base/Button.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const state = reactive({
    email: "",
    password: "",
    magicLink: false,
    sent: false,
    loader: false,
    error: null
})

const redirect = computed( () => route.query.redirect || '/')

const handleLogin = async () => {
    state.loader = true, state.error = null
    let credential = { email: state.email }
    if(!state.magicLink) credential['password'] = state.password
    const { error } = await store.dispatch("session/login", credential, { root: true })
    if(error) state.error = error
    else {
        if( ! state.magicLink ) router.push(redirect.value)
        else state.sent = true
    }
    state.loader = false, state.password = ""
}


</script>