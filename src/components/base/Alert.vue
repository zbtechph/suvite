<template>
    <div class="rounded p-4 my-2" :class="styles">
        {{ props.message }}
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    const props = defineProps({
        message: String ,
        styles: {
            type: String,
            default: 'bg-red-500 text-red-100'
        }
    })
</script>