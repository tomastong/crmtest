/**
 * @file login模块
 * @author donghongyan
 * @date 2020-06-01
 */

export default {
    namespaced: true,
    state: () => ({
        user: {
            username: 'donghongyan',
            password: 'Asd123',
            token: 'aosfnalsdfj'
        }
    }),
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        setUser({commit}) {
            commit('setUser');
        }
    },
    getters: {
        user: state => state.user
    }
};
