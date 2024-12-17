<template>
    <div class="viewer">
        <h2>Produits disponibles</h2>

        <ul>
            <li v-for="product in products">
                <span class="name">{{ product.name }}</span>
                <span class="price">{{ product.price }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>

const props = defineProps({
    products: {
        type: Array, 
        required: true
    }
})

</script>

<style scoped>

.viewer {
    background: #0c3772c2;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    color: white;

    ul {
        padding: 0;
        list-style-type: none;

        li {
            margin-right: 10px;
            margin-top: 10px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.151);

            .price {
                font-weight: bold;
                color: #bf97db;
                display: block;
            }
        }
    }
}

</style>