import { addArticleToCart, findByArticleName, getAllCartItems, removeArticle, updateArticle } from "@/services/cart.service";

const state = {
    userCart: new Map()
}

const getters = {
    getCart: state => {
        return Array.from(state.userCart, 
            ([name, article]) => ({ 
                name, 
                type: article.type, 
                count: article.count 
            })
        );
    }
}

const mutations = {
    UPDATE_CART: (state, userCart) => {
        state.userCart.clear();

        userCart.forEach(article => {
            state.userCart.set(article.name, {
                type: article.type, 
                count: article.count
            });
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
    putInCart: async (context, article) => {
        let count = 1; 

        const res = await findByArticleName(article.name)
            
        if(res.data.length == 0) {
            await addArticleToCart({
                name: article.name,
                type: article.type,
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
    pay: async (context, articleType) => {
        const res = await getAllCartItems()
            
        for(var article of res.data) {
            if(article.type == articleType) {
                await removeArticle(article.id);
            }
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