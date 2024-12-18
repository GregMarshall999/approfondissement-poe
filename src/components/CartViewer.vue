<template>
    <div class="viewer">
        <h2>Produits disponibles</h2>

        <ListerComp 
            @element-selected="i => console.log(i)"
        />
    </div>
</template>

<script setup>
import ListerComp from './Lister/ListerComp.vue';
</script>

<style scoped>

.viewer {
    background: #0c3772c2;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    color: white;
}

</style>