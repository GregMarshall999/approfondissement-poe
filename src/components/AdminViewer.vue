<template>
    <div class="lister">
        <h2>Tableau Admin Produits</h2>

        <ListerComp :is-admin="true"/>

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
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import ListerComp from './Lister/ListerComp.vue';

const store = useStore();

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

</script>

<style>

.lister {
    background: #6b662a;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    color: black;

    .admin-controls {
        background: rgba(255, 255, 255, 0.432);
        margin-top: 1em;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 1em;

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
}

</style>