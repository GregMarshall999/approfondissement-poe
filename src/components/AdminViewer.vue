<template>
    <div class="lister">
        <h2>Tableau Admin Produits</h2>

        <ListerComp 
            :is-admin="true"
            @element-selected="selectProduct"
            :selected-entity="selectedEntity"
            :selected-entity-caps="selectedEntityCaps"
        >
            <ElementComp
                v-if="!newProductMode"
                @selected="newProductMode = true"
                :index="productCount"
                :disabled="editProductMode"
            >
                <template #label>
                    Nouveau Produit
                </template>
                <span class="price">+</span>
            </ElementComp>
            <li v-else>
                <AdminForm
                    :fields="formFields"
                    :submit-button-text="'Ajouter'"
                    @success="newProduct"
                />
                <button @click="newProductMode=false">
                    Annuler
                </button>
            </li>
        </ListerComp>

        <div class="admin-tools" ref="adminDashboard">
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
                <div v-show="!newProductMode">
                    <h3 style="margin-bottom: 1em;">Editer un Produit</h3>
                    <AdminForm
                        :fields="formFields"
                        :submit-button-text="'Editer'"
                        @success="updateProduct"
                    />
                    <button @click="deleteProduct">Supprimer</button>
                </div>                
            </div>

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

                {{ currentEntity }}

                <div>
                    x: {{ x }} | y: {{ y }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import ListerComp from './Lister/ListerComp.vue';
import ElementComp from './Lister/ElementComp.vue';
import AdminForm from './Form/AdminForm.vue';
import { requiredPositiveNumber, requiredText } from '@/helpers/validationHelper';
import { useMouse } from '@/composables/MouseComposable';

const store = useStore();

const formFields = reactive([
    {
        placeholder: 'Nom Produit...', 
        type: 'text', 
        value: null, 
        rules: [requiredText]
    }, 
    {
        placeholder: 'Prix Produit...', 
        type: 'number', 
        value: null, 
        rules: [requiredPositiveNumber]
    }
])

//entity selection
const currentEntity = ref('product');
store.dispatch('setSelectedEntity', { forAdmin: true, entityName: currentEntity.value });
watch(currentEntity, () => {
    store.dispatch('setSelectedEntity', { forAdmin: true, entityName: currentEntity.value });
})
const selectedEntity = computed(() => store.getters.getSelectedEntity(true));
const selectedEntityCaps = computed(() => store.getters.getSelectedEntityCaps(true));

//element selection
const selectedIndex = ref(null);
const selectedProductId = ref(null);
const selectProduct = index => {
    selectedIndex.value = index;

    const storeProd = store.getters[`${selectedEntity.value}s/get${selectedEntityCaps.value}`](index);

    selectedProductId.value = storeProd.id;

    formFields[0].value = storeProd.name;
    formFields[1].value = storeProd.price;

    newProductMode.value = false;
    editProductMode.value = true;
}

//CRUD operations
const newProductMode = ref(false);
const editProductMode = ref(false);
const newProduct = () => {
    const product = {
        name: formFields[0].value, 
        price: formFields[1].value
    }
    store.dispatch(`${selectedEntity.value}s/add${selectedEntityCaps.value}`, product);
    
    resetSelection();
}
const updateProduct = () => {
    if(selectedIndex.value != null) {
        const product = { 
            id: selectedProductId.value, 
            name: formFields[0].value, 
            price: formFields[1].value
        };
        
        store.dispatch(`${selectedEntity.value}s/update${selectedEntityCaps.value}`, product);

        resetSelection();
    }
}
const deleteProduct = () => {
    if(selectedProductId.value != null) {
        store.dispatch(`${selectedEntity.value}s/remove${selectedEntityCaps.value}`, selectedProductId.value);
        
        resetSelection();
    }
}

//Price operations
const sales = ref(false);
const updateSales = () => {
    store.dispatch(`${selectedEntity.value}s/updateSales`, sales.value);
}
const augmentPrice = amount => {
    store.dispatch(`${selectedEntity.value}s/augmentPrice`, amount);
}
const reduicePrice = () => {
    store.dispatch(`${selectedEntity.value}s/reduicePrice`);
}

const productCount = computed(() => store.getters[`${selectedEntity.value}s/count${selectedEntityCaps.value}s`]);

const resetSelection = () => {
    selectedIndex.value = null;

    selectedProductId.value = null;

    newProductMode.value = false;
    editProductMode.value = false;

    formFields.forEach(f => f.value = null);
}

const adminDashboard = ref(null);
const { x, y } = useMouse(adminDashboard);

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

            border-right: solid 2px rgb(105, 105, 105);
            padding-right: 10%;

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

        .entity-selector {
            display: flex;
            flex-direction: column;
            gap: 1em;
        }
    }
}

</style>