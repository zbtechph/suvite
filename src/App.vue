<template>
  <div class="flex flex-col">
    <zb-navigation-top/>
    <div class="flex flex-row md:justify-center">
      <div class="w-full md:w-1/2 flex flex-col p-4">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import ZbNavigationTop from './components/NavigationTop.vue'

  const store = useStore();

  store.dispatch('session/appInit', null)

</script>