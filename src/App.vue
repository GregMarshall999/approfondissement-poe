<template>
	<AdminViewer/>
  <CartViewer/>
</template>

<script setup>
import { useStore } from 'vuex';
import AdminViewer from './components/AdminViewer.vue';
import CartViewer from './components/CartViewer.vue';
import { onBeforeMount } from 'vue';

const store = useStore();
onBeforeMount(() => {
  store.dispatch('products/loadProducts')
  store.dispatch('books/loadBooks');
  store.dispatch('cart/loadUserCart')
});
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
