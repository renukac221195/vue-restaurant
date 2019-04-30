import Vue from 'vue'
import Vuex from 'vuex'
import callService from '../../service';

Vue.use(Vuex)

export const loadItems = {
    state:
    {
        headers: [],
        items: [],
        cartItems:[],
        orderTotal: 0,
        total:0
    },
    getters: {
        addHeadersToMenu: state => {
            return state.headers;
        },
        addItemsToMenu: state => {
            return state.items;
        },
        addItemsToCart: state => {
            return state.cartItems;
        },
        cartTotal: state => {
            let order = 0;
            state.cartItems.forEach(element => {
                order = order + element.price
            });
            return order;
        },
    },
    actions: {
        fetchItems: (context, url) => {
            return new Promise((resolve) => {
                callService(url).then((response) => {
                    resolve(response);
                    context.commit('fetchItems', response);
                })
            })
        },
        addMultipleToCart: ({commit}, cartItems) => {
            commit('addMultipleToCart',cartItems);
        },
        addToCart: ({commit}, cartItems) => {
            commit('addToCart', cartItems);
        }
    },
    mutations: {
        fetchItems: (state, response) => {
            state.headers = response.data.headers;
            state.items = response.data.items;
        },
        addMultipleToCart: (state, response) => {
            state.cartItems = [...state.cartItems, ...response];
        },
        addToCart: (state, response) => {
            state.cartItems = [...state.cartItems, ...response];
        }
    }
}