import { createStore } from "vuex"
import products from "./products";
import cart from "./cart";
import books from "./books";

const state = {
    selectedEntity: null
}

const getters = {
    getSelectedEntity: state =>  {
        return state.selectedEntity;
    }, 
    getSelectedEntityCaps: state => {
        return `${state.selectedEntity.charAt(0).toUpperCase()}${state.selectedEntity.substring(1)}`;
    }
}

const mutations = {
    SET_SELECTED_ENTITY: (state, entityName) => {
        state.selectedEntity = entityName;
    }
}

const actions = {
    setSelectedEntity: (context, entityName) => {
        context.commit('SET_SELECTED_ENTITY', entityName);
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