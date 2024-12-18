const state = {
    userCart: new Map()
}

const getters = {
    getCart: state => {
        return Array.from(state.userCart, 
            ([name, count]) => ({ name, count })
        );
    }
}

const mutations = {
    ADD_TO_CART: (state, payload) => {
        let count = 1; 

        if(state.userCart.has(payload)) {
            count = state.userCart.get(payload) + 1;
        }

        state.userCart.set(payload, count);
    }, 
    CLEAR_CART: state => {
        state.userCart.clear();
    }
}

const actions = {
    putInCart: (context, payload) => {
        context.commit('ADD_TO_CART', payload);
    }, 
    pay: context => {
        context.commit('CLEAR_CART');
    }
}

export default {
    namespaced: true, 
    state, 
    getters, 
    mutations, 
    actions
}