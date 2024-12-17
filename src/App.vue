<template>
	<ProductLister :product-list="products" />
	<ProductViewer :products="products"/>
</template>

<script setup>
import { ref } from 'vue';
import ProductLister from './components/ProductLister.vue';
import ProductViewer from './components/ProductViewer.vue';

const products = ref([
	{ name: 'Bananes', price: 2 }, 
	{ name: 'Pommes', price: 1 }, 
	{ name: 'Salade', price: 3 }, 
	{ name: 'Abricots', price: 2 }
])

</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
