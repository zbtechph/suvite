<template>
    <form method="POST" action ="/" @submit.prevent="handleRecovery">
        <div class="text-2xl py-4">Recover</div>
        <template v-if="state.sent">
            <zb-alert styles="bg-green-500 text-green-100" message="Instructions for recovering your account has been sent to your email address"/>
        </template>
        <template v-else>
            <zb-alert v-if="state.error" :message="state.error.message"/>
            <zb-form-input label="Email" type="email" v-model="state.email" required/>
            <div class="mb-3">
                <zb-button label="Send Recovery Email" type="submit" styles="bg-green-500 text-green-100"/>
            </div>
        </template>
    </form>
</template>

<script setup>
import { reactive } from 'vue'
import { supabase } from '../../supabase'
import ZbAlert from '../../components/base/Alert.vue'
import ZbFormInput from '../../components/base/FormInput.vue'
import ZbButton from '../../components/base/Button.vue'

const state = reactive({
    email: "",
    loader: false,
    error: null,
    sent: false
})

const handleRecovery = async () => {
    state.loader = true, state.error = null
    const { error } = await supabase.auth.api.resetPasswordForEmail(state.email)
    if(error) state.error = error
    else state.sent = true
    state.loader = false;
}

</script>