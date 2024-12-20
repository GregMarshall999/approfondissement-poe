import { changeBooksPrice } from "@/helpers/bookHelper";
import { parseHalfPrice } from "@/helpers/productHelper";
import { createBook, deleteBook, findBooks, updateBook } from "@/services/book.service";

const state = {
    books: [], 
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
    SET_BOOKS: (state, books) => {
        state.books = books;
    },
    SET_SALES: (state, payload) => {
        state.sales = payload;
    }
}

const actions = {
    loadBooks: context => {
        findBooks().then(res => {
            context.commit('SET_BOOKS', res.data);
        })
        .catch(error => console.error('Error loading books', error));
    },
    augmentPrice: async (context, addToPrice) => {
        await changeBooksPrice(context.getters.getBooks, addToPrice);
        context.dispatch('loadBooks');
    },
    reduicePrice: async context => {
        await changeBooksPrice(context.getters.getBooks, -1);
        context.dispatch('loadBooks');
    }, 
    addBook: (context, book) => {
        createBook(book)
            .then(res => {
                if(res.status == 201) {
                    context.dispatch('loadBooks');
                }
            })
    },
    updateBook: (context, book) => {
        updateBook(book.id, book)
            .then(res => {
                if(res.status == 200) {
                    context.dispatch('loadBooks');
                }
            })
    },
    removeBook: (context, bookId) => {
        deleteBook(bookId)
            .then(res => {
                if(res.status == 200) {
                    context.dispatch('loadBooks');
                }
            })
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