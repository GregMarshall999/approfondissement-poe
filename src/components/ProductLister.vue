<template>
    <div class="lister">
        <h2>Liste de produits</h2>

        <ul>
            <li v-for="product in productList">
                <span class="name">{{ product.name }}</span>
                <span class="price">{{ product.price }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>

const props = defineProps({
    productList: {
        type: Array, 
        required: true
    }
});

</script>

<style>

.lister {
    background: #6b662a;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    color: black;

    ul {
        padding: 0;

        li {
            display: inline-block;
            margin-right: 10px;
            margin-top: 10px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.432);

            .price {
                font-weight: bold;
                color: #e8260c;
                margin-left: 4px;
            }
        }
    }
}

</style>