import { createStore } from "vuex"
import products from "./products";
import cart from "./cart";
import books from "./books";

const state = {
    adminSelectedEntity: null, 
    cartSelectedEntity: null
}

const getters = {
    getSelectedEntity: state => forAdmin =>  {
        if(forAdmin) {
            return state.adminSelectedEntity;
        }
        else {
            return state.cartSelectedEntity;
        }
    }, 
    getSelectedEntityCaps: state => forAdmin => {
        if(forAdmin) {
            return `${state.adminSelectedEntity.charAt(0).toUpperCase()}${state.adminSelectedEntity.substring(1)}`;
        }
        else {
            return `${state.cartSelectedEntity.charAt(0).toUpperCase()}${state.cartSelectedEntity.substring(1)}`;
        }
    }
}

const mutations = {
    SET_ADMIN_SELECTED_ENTITY: (state, entityName) => {
        state.adminSelectedEntity = entityName;
    }, 
    SET_CART_SELECTED_ENTITY: (state, entityName) => {
        state.cartSelectedEntity = entityName;
    }
}

const actions = {
    setSelectedEntity: (context, payload) => {
        if(payload.forAdmin) {
            context.commit('SET_ADMIN_SELECTED_ENTITY', payload.entityName);
        }
        else {
            context.commit('SET_CART_SELECTED_ENTITY', payload.entityName);
        }
    }
}

const store = createStore({
    state, 
    getters,
    mutations,
    actions, 
    modules: {
        products, 
        books,
        cart
    }, 
    strict: true
});

export default store;