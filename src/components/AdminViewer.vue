<template>
    <div class="lister">
        <h2>Tableau Admin Produits</h2>

        <ListerComp 
            :is-admin="true"
            @element-selected="selectProduct"
        >
            <ElementComp
                v-if="!newProductMode"
                @selected="newProductMode = true"
                :index="productCount"
            >
                <template #label>
                    Nouveau Produit
                </template>
                <span class="price">+</span>
            </ElementComp>
            <li v-else>
                <form @submit.prevent="newProduct">
                    <input 
                        type="text" 
                        v-model="product.name"
                        required
                        placeholder="Nom Produit..." 
                    />
                    <input 
                        type="number" 
                        v-model="product.price"
                        required
                        placeholder="Prix Produit..." 
                    />
                    <button>Ajouter</button>
                </form>
            </li>
        </ListerComp>

        <div class="admin-tools">
            <div class="admin-controls">
                <h3>Contrôlles Admin</h3>

                <label class="sales-toggle">
                    Activer les soldes
                    <input
                        type="checkbox"
                        v-model="sales"
                        @change="updateSales"
                    />
                    <span class="checkmark"></span>
                </label>

                <button @click="augmentPrice(4)">Augmenter Prix</button>
                <button @click="reduicePrice">Réduire Prix</button>
            </div>

            <div class="product-editor">
                <form @submit.prevent="updateProduct">
                    <h3>Editer un Produit</h3>
                    <input 
                        type="text" 
                        v-model="selectedProduct.name"
                        placeholder="Nom Produit" 
                    />
                    <input 
                        type="number" 
                        v-model="selectedProduct.price"
                        placeholder="Prix Produit" 
                    />
                    <button>Editer</button>
                </form>
                <button @click="deleteProduct">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import ListerComp from './Lister/ListerComp.vue';
import ElementComp from './Lister/ElementComp.vue';

const store = useStore();

const selectedIndex = ref(null);
const selectedProduct = reactive({
    name: '', 
    price: 0
});
const selectProduct = index => {
    selectedIndex.value = index;

    const storeProd = store.getters.getProduct(index);

    selectedProduct.name = storeProd.name;
    selectedProduct.price = storeProd.price;
}

const newProductMode = ref(false);
const product = reactive({
    name: null, 
    price: null
})
const newProduct = () => {
    store.dispatch('addProduct', { ...product });
    newProductMode.value = false;
    product.name = null;
    product.price = null;
}
const updateProduct = () => {
    if(selectedIndex.value != null) {
        store.dispatch('updateProduct', {
            index: selectedIndex.value, 
            product: {
                name: selectedProduct.name, 
                price: selectedProduct.price
            }
        })

        selectedIndex.value = null;
        selectedProduct.name = '';
        selectedProduct.price = 0;
    }
}
const deleteProduct = () => {
    if(selectedIndex.value != null) {
        store.dispatch('removeProduct', selectedIndex.value);
        selectedIndex.value = null;
        selectedProduct.name = '';
        selectedProduct.price = 0;
    }
}

const sales = ref(false);
const updateSales = () => {
    store.dispatch('updateSales', sales.value);
}
const augmentPrice = amount => {
    store.dispatch('augmentPrice', amount);
}
const reduicePrice = () => {
    store.dispatch('reduicePrice');
}

const productCount = computed(() => store.getters.countProducts);

</script>

<style lang="scss">

.lister {
    background: #6b662a;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    color: black;

    .admin-tools {
        background: rgba(255, 255, 255, 0.432);
        margin-top: 1em;
        padding: 20px;
        display: flex;;
        gap: 10%;

        .admin-controls {
            display: flex;
            flex-direction: column;
            gap: 1em;
            border-right: solid 2px rgb(105, 105, 105);
            padding-right: 10%;

            .sales-toggle {
                display: block;
                position: relative;
                padding-left: 35px;
                margin-bottom: 12px;
                cursor: pointer;
                font-size: 16px;
                user-select: none;

                input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;

                    &:checked ~ .checkmark {
                        background-color: #6b662a;
                    }

                    &:checked ~ .checkmark:after {
                        display: block;
                    }
                }

                .checkmark {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 25px;
                    width: 25px;
                    background-color: #eee;

                    &:after {
                        content: "";
                        position: absolute;
                        display: none;
                        left: 9px;
                        top: 5px;
                        width: 5px;
                        height: 10px;
                        border: solid white;
                        border-width: 0 3px 3px 0;
                        transform: rotate(45deg);
                    }
                }

                &:hover input ~ .checkmark {
                    background-color: #ccc;
                }
            }

            button {
                width: fit-content;
                padding: 10px;
                border-radius: 0;
                border: none;
            }
        }

        .product-editor {
            form {
                display: flex;
                flex-direction: column;
                gap: 1em;
                margin-bottom: 1em;

                input {
                    border: none;
                    font-size: 15px;
                }

                button {
                    width: fit-content;
                }
            }
        }
    }
}

</style>