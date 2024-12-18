import { createStore } from "vuex"
import products from "./products";
import cart from "./cart";

const store = createStore({
    modules: {
        products, 
        cart
    }, 
    strict: true
});

export default store;