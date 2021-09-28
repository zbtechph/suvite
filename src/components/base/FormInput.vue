<template>
    <div class="flex flex-col mb-3">
        <label class="mb-1 text-gray-500 text-sm font-semibold">{{ props.label }}</label>
        <input :type="props.type" class="p-2 border-2 rounded" :required="props.required" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>
    </div>
</template>

<script setup>

    defineEmits(["update:modelValue"])
    
    const props = defineProps({
        label: String,
        type: String,
        required: {
            type: Boolean,
            default: true
        },
        modelValue: String
    })

</script>