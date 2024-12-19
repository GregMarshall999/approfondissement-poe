<template>
    <li @click="clicked">
        <slot name="label"></slot>
        <slot></slot>
    </li>
</template>

<script setup>

const props = defineProps({
    index: {
        type: Number, 
        required: true
    }, 
    disabled: {
        type: Boolean, 
        default: false
    }
});

const emit = defineEmits(['selected']);

const clicked = () => {
    if(!props.disabled) {
        emit('selected', props.index)
    }
}

</script>