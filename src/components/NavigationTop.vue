<template>

    <div class="flex flex-row md:justify-center md:items-center bg-white shadow-md">
        <div class="w-full md:w-1/2 flex flex-row justify-between items-center h-20">
            <div class="flex flex-row items-center">
                <h1 class="p-4 text-2xl">ZB</h1>
                <router-link :to="{ name: 'home' }" class="p-4">Home</router-link>
                <template v-if="user">
                    <router-link :to="{ name: 'account' }" class="p-4">Account</router-link>
                </template>
            </div>
            <div class="flex flex-row">
                <template v-if="user">
                    <button type="button" @click.prevent="handleLogout" class="p-4 text-red-500">Logout</button>
                </template>
                <template v-else>
                     <router-link :to="{ name: 'login' }" class="p-4 rounded bg-blue-500 text-blue-100 font-semibold">Login</router-link>
                     <router-link :to="{ name: 'register' }" class="p-4 text-blue-500">Register</router-link>
                </template>
            </div>
        </div>
    </div>

</template>


<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const user = computed(()=>store.state.session.user)

const handleLogout = async () => {
    await store.dispatch('session/logout', null, { root: true })
    router.push({ name: 'login' })
}

</script>