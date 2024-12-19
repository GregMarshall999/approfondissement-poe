<template>
    <div class="viewer" ref="cartDashboard">
        <h2>Produits disponibles</h2>

        <div style="display: flex; gap: 10%;">
            <ListerComp 
                @element-selected="addToCart"
                style="width: 50%;"
                :selected-entity="selectedEntity"
                :selected-entity-caps="selectedEntityCaps"
            />
            <UserCartComp/>

            <div class="entity-selector">
                <div>
                    <input 
                        type="radio"
                        v-model="currentEntity"
                        value="product"
                        checked
                    />
                    <label>Produits</label>
                </div>
                
                <div>
                    <input 
                        type="radio"
                        v-model="currentEntity"
                        value="book"
                    />
                    <label>Livres</label>
                </div>
            </div>
        </div>
        
        x: {{ x }} | y: {{ y }}
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import ListerComp from './Lister/ListerComp.vue';
import UserCartComp from './Cart/UserCartComp.vue';
import { ref } from 'vue';
import { useMouse } from '@/composables/MouseComposable';
import { useEntitySelect } from '@/composables/EntitySelection';

const store = useStore();

//entity selection
const { 
    currentEntity,
    selectedEntity, 
    selectedEntityCaps
} = useEntitySelect(false)

const addToCart = index => {
    const product = store.getters[`${selectedEntity.value}s/get${selectedEntityCaps.value}`](index);

    if(product) {
        store.dispatch('cart/putInCart', product.name);
    }
}

const cartDashboard = ref(null);
const { x, y } = useMouse(cartDashboard);
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