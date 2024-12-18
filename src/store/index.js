import { parseHalfPrice } from "@/helpers/productHelper";
import { createStore } from "vuex"

const state = {
    products: [
        { name: 'Bananes', price: 2 }, 
        { name: 'Pommes', price: 1 }, 
        { name: 'Salade', price: 3 }, 
        { name: 'Abricots', price: 2.33 }
    ], 
    sales: false
}

const getters = { 
    getProducts: state => {
        if(!state.sales) {
            return state.products;
        }

        return state.products.map(p => {
            return {
                name: `**${p.name}**`, 
                price: parseHalfPrice(p.price)
            }
        });
    }
}

const mutations = {
    AUGMENT_PRICE: (state, payload) => {
        state.products.forEach(p => p.price += payload);
    },
    REDUICE_PRICE: state => {
        state.products.forEach(p => p.price -= 1);
    }, 
    SET_SALES: (state, payload) => {
        state.sales = payload;
    }
}

const actions = {
    augmentPrice: (context, payload) => {
        setTimeout(() => context.commit('AUGMENT_PRICE', payload), 1000);
    },
    reduicePrice: context => {
        setTimeout(() => context.commit('REDUICE_PRICE'), 1500);
    }, 
    updateSales: (context, payload) => {
        context.commit('SET_SALES', payload);
    }
}

const store = createStore({
    state, 
    getters, 
    mutations, 
    actions
});

export default store;