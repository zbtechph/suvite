<template>
    <form method="POST" action ="/" @submit.prevent="handleSignup">
        <div class="text-2xl py-4">Sign up</div>
        <zb-alert v-if="state.error" :message="state.error.message"/>
        <zb-form-input label="Email" v-model="state.email" type="email" required/>
        <zb-form-input label="Password" v-model="state.password" type="password" required/>
        <div>
            <zb-button type="submit" label="Join" styles="bg-green-500 text-green-100" :disabled="state.loader"/>
        </div>
    </form>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ZbAlert from '../../components/base/Alert.vue'
import ZbFormInput from '../../components/base/FormInput.vue'
import ZbButton from '../../components/base/Button.vue'

const store = useStore()
const router = useRouter()
const state = reactive({
    email: "",
    password: "",
    loader: false,
    error: null
})

const handleSignup = async () => {
    state.loader = true, state.error = null
    const { error } = await store.dispatch("session/signUp", { email: state.email, password: state.password }, { root: true })
    if(error) state.error = error
    else router.push({ name: 'home' })
    state.loader = false, state.password = ""
}


</script>