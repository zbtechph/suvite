<template>
  <div>
    <div>
      <ul>
        <li class=""> <router-link :to="{ name: 'home' }">Home</router-link> </li>
        <template v-if="user">
          <li class=""> <router-link :to="{ name: 'account' }">Account</router-link> </li>
          <li class=""><button type="button" @click.prevent="handleLogout">Logout</button></li>
        </template>
        <template v-else>
          <li class=""> <router-link :to="{ name: 'login' }">Login</router-link> </li>
          <li class=""> <router-link :to="{ name: 'register' }">Register</router-link> </li>
        </template>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore();
  const user = computed(() => store.state.session.user)

  store.dispatch('session/appInit', null, { root: true })

  const handleLogout = async () => {
    await store.dispatch('session/logout', null, { root: true })
  }

</script>