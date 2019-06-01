import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        history: []
    },
    getters: {
        myHistory: state => {
            return state.history;
        },
        last: state => {
            const { history } = state;
            return history[history.length - 1] || null;
        }
    },
    mutations: {
        addHis: (state, his) => {
            state.history.push(his);
        },
        removeHis: (state, his) => {
            const { history } = state,
                index = history.indexOf(his);
            history.splice(index, 1);
        },
        clear: state => {
            state.history.splice(0);
        }
    }
});