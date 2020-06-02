/**
 * @file login模块
 * @author donghongyan
 * @date 2020-06-01
 */

export default {
    namespaced: true,
    state: () => ({
        user: {
            username: '',
            password: ''
        },
        token: '',
        router: []
    }),
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setToken(state, payload) {
            state.token = payload;
            window.localStorage.setItem('token', payload);
        },
        setRouter(state, payload) {
            state.router = payload;
        }
    },
    actions: {
        setUser({commit}, payload) {
            commit('setUser', payload);
        },
        setToken({commit}, payload) {
            commit('setToken', payload);
        },
        setRouter({commit}, payload) {
            commit('setRouter', payload);
        }
    },
    getters: {
        user: state => state.user,
        token: state => state.token,
        router: state => state.router
    }
};
