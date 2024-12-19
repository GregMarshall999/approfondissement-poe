import { parseHalfPrice } from "@/helpers/productHelper";

const state = {
    books: [
        { name: 'LOTR', price: 5 }, 
        { name: 'GOT', price: 10 }, 
    ], 
    sales: false
}

const getters = {
    getBook: state => payload => {
        return state.books[payload];
    },
    getBooks: state => {
        if(!state.sales) {
            return state.books;
        }

        return state.books.map(b => {
            return {
                name: `**${b.name}**`, 
                price: parseHalfPrice(b.price)
            }
        });
    }, 
    countBooks: state => {
        return state.books.length;
    }, 
    findBookPrice: state => payload => {
        const cost = state.books.filter(b => {
            if(b.name == payload) {
                return b.price;
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
    AUGMENT_PRICE: (state, payload) => {
        state.books.forEach(b => b.price += payload);
    },
    REDUICE_PRICE: state => {
        state.books.forEach(b => b.price -= 1);
    }, 
    SET_SALES: (state, payload) => {
        state.sales = payload;
    }, 
    PUSH_BOOK: (state, payload) => {
        state.books.push(payload);
    },
    SET_BOOK: (state, payload) => {
        state.books[payload.index] = payload.book;
    },
    DELETE_BOOK: (state, payload) => {
        state.books.splice(payload, 1);
    }
}

const actions = {
    augmentPrice: (context, payload) => {
        context.commit('AUGMENT_PRICE', payload);
    },
    reduicePrice: context => {
        context.commit('REDUICE_PRICE');
    }, 
    updateSales: (context, payload) => {
        context.commit('SET_SALES', payload);
    }, 
    addBook: (context, payload) => {
        context.commit('PUSH_BOOK', payload);
    },
    updateBook: (context, payload) => {
        context.commit('SET_BOOK', payload);
    },
    removeBook: (context, payload) => {
        context.commit('DELETE_BOOK', payload);
    }
}

export default {
    namespaced: true, 
    state, 
    getters, 
    mutations, 
    actions
}