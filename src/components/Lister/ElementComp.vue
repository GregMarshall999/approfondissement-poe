<template>
    <li @click="emit('selected', index)">
        <slot name="label"></slot>
        <slot></slot>
    </li>
</template>

<script setup>

const props = defineProps({
    index: {
        type: Number, 
        required: true
    }
});

const emit = defineEmits(['selected']);

</script>