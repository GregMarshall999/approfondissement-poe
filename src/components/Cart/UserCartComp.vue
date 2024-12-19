<template>
    <div>
        <h3>Panier</h3>
        <span v-if="cart.length > 0">Total: {{ total }}€</span>

        <ul>
            <li v-for="cartItem in cart">
                <span>{{ cartItem.name }}</span>
                <span> x{{ cartItem.count }}</span>
                <span> Article: {{ cartItem.cost }}€</span>
            </li>
        </ul>

        <button v-if="cart.length > 0" @click="store.dispatch('cart/pay')">Payer</button>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

//entity selection
const selectedEntity = computed(() => store.getters.getSelectedEntity(false));
const selectedEntityCaps = computed(() => store.getters.getSelectedEntityCaps(false));

const cart = computed(() => {
    const storeCart = store.getters['cart/getCart'];

    return storeCart.map(item => {
        const cost = store.getters[`${selectedEntity.value}s/find${selectedEntityCaps.value}Price`](item.name);
        return {
            name: item.name, 
            count: item.count, 
            cost: cost*item.count
        }
    });
})

const total = computed(() => {
    let value = 0;
    cart.value.forEach(item => {
        value += item.cost;
    });

    return value;
})

</script>