import { changeProductsPrice, parseHalfPrice } from "@/helpers/productHelper";
import { createProduct, deleteProduct, findProducts, updateProduct } from "@/services/product.service";

const state = {
    products: [], 
    sales: false
}

const getters = { 
    getProduct: state => productIndex => {
        return state.products[productIndex];
    },
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
    }, 
    countProducts: state => {
        return state.products.length;
    }, 
    findProductPrice: state => productName => {
        const cost = state.products.filter(p => {
            if(p.name == productName) {
                return p.price;
            }
        });

        if(cost.length == 1) {
            if(state.sales) {
                return parseHalfPrice(cost[0].price);
            }
            else {
                return cost[0].price;
            }
        }
    }
}

const mutations = {
    SET_SALES: (state, salesValue) => {
        state.sales = salesValue;
    }, 
    SET_PRODUCTS: (state, productsValue) => {
        state.products = productsValue
    }
}

const actions = {
    loadProducts: context => {
        findProducts()
            .then(res => {
                console.log(res);
                context.commit('SET_PRODUCTS', res.data);
            })
            .catch(error => console.error('Error loading products', error));
    },
    augmentPrice: async (context, addToPrice) => {
        await changeProductsPrice(context.getters.getProducts, addToPrice);
        context.dispatch('loadProducts');
    },
    reduicePrice: async context => {
        await changeProductsPrice(context.getters.getProducts, -1);
        context.dispatch('loadProducts');
    }, 
    addProduct: (context, product) => {
        createProduct(product)
            .then(res => {
                if(res.status == 201) {
                    context.dispatch('loadProducts');
                }
            }
        ) 
    },
    updateProduct: (context, product) => {
        updateProduct(product.id, product)
            .then(res => {
                if(res.status == 200) {
                    context.dispatch('loadProducts');
                }
            }
        )
    },
    removeProduct: (context, productId) => {
        deleteProduct(productId)
            .then(res => {
                if(res.status == 200) {
                    context.dispatch('loadProducts');
                }
            }
        )
    }, 
    updateSales: (context, payload) => {
        context.commit('SET_SALES', payload);
    }
}

export default {
    namespaced: true, 
    state, 
    getters, 
    mutations, 
    actions
}