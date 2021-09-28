<template>
    <form class="w-full" method="POST" action ="/" @submit.prevent="handleLogin">
        <div class="text-2xl py-4">Authentication</div>
        <zb-alert v-if="state.error" :message="state.error.message"/>
        <zb-form-input label="Email" v-model="state.email" type="email" required/>
        <div class="flex flex-col mb-3">
            <div class="flex flex-row justify-between mb-1 text-gray-500 text-sm font-semibold">
                <label>Password</label>
                <router-link class="text-blue-500 hover:underline" :to="{ name: 'recover' }" tabindex="-1">Forgot?</router-link>
            </div>
            <input type="password" v-model="state.password" @keydown="state.error=null" class="p-2 border-2 rounded" required/>
        </div>
        <div class="mb-3">
            <zb-button type="submit" label="Sign in" styles="bg-green-500 text-green-100" :disabled="state.loader"/>
        </div>
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
    sent: false,
    loader: false,
    error: null
})

const redirect = computed( () => route.query.redirect || '/')

const handleLogin = async () => {
    state.loader = true, state.error = null
    const { error } = await store.dispatch("session/login", { email: state.email, password: state.password }, { root: true })
    if(error) state.error = error
    else router.push(redirect.value)
    state.loader = false, state.password = ""
}


</script>