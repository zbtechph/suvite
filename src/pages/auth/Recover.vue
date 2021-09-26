<template>
    <form method="POST" action ="/login" @submit.prevent="handleRecovery">
        <div>Recover</div>
        <div>
            <label>Email</label>
            <input type="email" v-model="state.email" required/>
        </div>
        <div>
            <button type="submit" :disabled="state.loader">Login</button>
        </div>
    </form>
</template>

<script setup>
import { reactive } from 'vue'
import { supabase } from '../../supabase'

const state = reactive({
    email: "",
    loader: false,
    error: null
})

const handleRecovery = () => {
    state.loader = true;
    supabase.auth.api.resetPasswordForEmail(state.email)
        .then(()=>{
            alert("email recovery sent")
        }).catch( err => {
            state.error = err
        }).finally(()=>{
            state.loader = false
        })
}

</script>