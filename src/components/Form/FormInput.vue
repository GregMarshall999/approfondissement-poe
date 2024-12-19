<template>
    <input 
        :placeholder="placeholder"
        :type="type"
        v-model="model"
        :class="{ error: errors }"
    />
    <slot></slot>
</template>

<script setup>

const props = defineProps({
    placeholder: {
        type: String, 
        required: true
    }, 
    type: {
        type: String, 
        default: 'text'
    }, 
    errors: Boolean
});

const model = defineModel();

</script>

<style scoped>

.error {
    border: solid 1px red;
}

</style>