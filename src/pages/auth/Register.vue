<template>
    <form method="POST" action ="/login" @submit.prevent="handleSignup">
        <div>Register</div>
        <div>
            <label>Email</label>
            <input type="email" v-model="state.email" required/>
        </div>
        <div>
            <label>Password</label>
            <input type="password" v-model="state.password" required/>
        </div>
        <div>
            <button type="submit" :disabled="state.loader">Login</button>
        </div>
    </form>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const state = {
    email: "",
    password: "",
    loader: false,
    error: null
}

const handleSignup = () => {
    state.loader = true;
    store.dispatch("session/signUp", { email: state.email, password: state.password }, { root: true })
        .then( response => {
            console.log(response)
            alert("ok!")
        })
        .catch( err => {
            state.error = err
        })
        .finally(()=>{
            state.loader = false;
        })
}


</script>