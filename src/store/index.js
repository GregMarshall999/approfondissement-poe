import { createStore } from "vuex"

const state = {
    products: [
        { name: 'Bananes', price: 2 }, 
        { name: 'Pommes', price: 1 }, 
        { name: 'Salade', price: 3 }, 
        { name: 'Abricots', price: 2 }
    ]
}

const store = createStore({
    state
});

export default store;