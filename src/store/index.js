import { createStore } from "vuex"

const state = {
    products: [
        { name: 'Bananes', price: 2 }, 
        { name: 'Pommes', price: 1 }, 
        { name: 'Salade', price: 3 }, 
        { name: 'Abricots', price: 2.33 }
    ]
}

const getters = {
    getSaleProducts: state => {
        return state.products.map(p => {
            return {
                name: `**${p.name}**`, 
                price: parseHalfPrice(p.price)
            }
        });
    }
}

const mutations = {
    REDUICE_PRICE: state => {
        state.products.forEach(p => p.price -= 1);
    }
}

const parseHalfPrice = price => {
    let hp = price / 2;

    if(hp % 1 != 0) {
        let precision = hp.toPrecision(3);

        if(precision.split('.')[1].length > 2) {
            return precision.substring(0, precision.split('.')[0].length + 3);
        }

        return precision.toString();
    }

    return hp;
}

const store = createStore({
    state, 
    getters, 
    mutations
});

export default store;