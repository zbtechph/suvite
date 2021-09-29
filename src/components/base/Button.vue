<template>
    <button class="w-full p-4 rounded font-bold text-sm uppercase disabled:opacity-50" :class="props.styles" :type="props.type" :disabled="props.disabled">{{ props.label }}</button>
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
    styles: {
        type: String,
        default: 'bg-green-500 text-green-100'
    },
    label: String,
    disabled: {
        type: Boolean,
        default: false
    }
})
</script>