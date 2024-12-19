import { addArticleToCart, findByArticleName, getAllCartItems, removeArticle, updateArticle } from "@/services/cart.service";

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
    UPDATE_CART: (state, userCart) => {
        state.userCart.clear();

        userCart.forEach(article => {
            state.userCart.set(article.name, article.count);
        });
    }
}

const actions = {
    loadUserCart: context => {
        getAllCartItems()
            .then(res => {
                context.commit('UPDATE_CART', res.data);
            }
        )
    },
    putInCart: async (context, articleName) => {
        let count = 1; 

        const res = await findByArticleName(articleName)
            
        if(res.data.length == 0) {
            await addArticleToCart({
                name: articleName, 
                count
            });
        }
        else if (res.data.length == 1) {
            const article = res.data[0];
            article.count++;
            await updateArticle(article);
        }

        context.dispatch('loadUserCart')
    }, 
    pay: async context => {
        const res = await getAllCartItems()
            
        for(var article of res.data) {
            await removeArticle(article.id);
        }
        
        context.dispatch('loadUserCart');
    }
}

export default {
    namespaced: true, 
    state, 
    getters, 
    mutations, 
    actions
}