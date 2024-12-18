<template>
    <ul :class="isAdmin ? 'admin': 'default'">
        <ElementComp 
            v-for="(product, index) in products"
            :index="index"
            @selected="elementSelected"
        >
            <template #label>
                <span class="name">{{ product.name }}</span>
            </template>
            
            <span class="price">{{ product.price }}</span>
        </ElementComp>
    </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ElementComp from './ElementComp.vue';

const store = useStore();

const products = computed(() => store.getters.getProducts);

const props = defineProps({
    isAdmin: {
        type: Boolean, 
        default: false
    }
})

const emit = defineEmits(['elementSelected']);
const elementSelected = index => {
    emit('elementSelected', index);
}

</script>

<style lang="scss" scoped>
@use '@/scss/Style.scss';

.admin {
    @include Style.product-style(
        $li-display: inline-block, 
        $li-background: rgba(255, 255, 255, 0.432),
        $li_hover-background: rgba(255, 255, 255, 0.205),
        $li_price-display: initial, 
        $li_price-color: #e8260c, 
        $li_price-marginLeft: 4px
    );
}

.default {
    @include Style.product-style;
}

</style>