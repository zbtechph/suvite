<template>
    <form method="POST" action ="/" @submit.prevent="handleRecovery">
        <div class="text-2xl py-4">Change password</div>
        <template v-if="state.changed">
            <zb-alert styles="bg-green-500 text-green-100" message="Password has been updated successfully!"/>
        </template>
        <template v-else>
            <zb-alert v-if="state.error" :message="state.error.message"/>
            <zb-form-input label="Password" type="password" v-model="state.password" required/>
            <div class="mb-3">
                <zb-button label="Update" type="submit" styles="bg-green-500 text-green-100"/>
            </div>
        </template>
    </form>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../../supabase'
import ZbAlert from '../../components/base/Alert.vue'
import ZbFormInput from '../../components/base/FormInput.vue'
import ZbButton from '../../components/base/Button.vue'

const state = reactive({
    password: "",
    loader: false,
    error: null,
    changed: false
})

const route = useRoute()

const accessToken = computed( () => route.query['access_token'] || "")

const handleRecovery = async () => {
    state.loader = true, state.error = null
    const { error } = await await supabase.auth.api
      .updateUser(accessToken.value, { password: state.password })
    if(error) state.error = error, state.password = ""
    else state.changed = true
    state.loader = false
}

</script>