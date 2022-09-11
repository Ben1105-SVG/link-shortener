import axios from "axios";

export default {
    state: {
        links: []
    },
    mutations: {
        SET_LINKS(state, data){
            state.links = data
        }
    },
    getters: {
        links: (state) => state.links
    },
    actions: {
        /**
         *
         * @param commit
         * @returns {Promise<unknown>}
         */
        fetchLinks({commit}) {
            return new Promise((resolve, reject) => {
                axios.get('/api/short-links').then(res => {
                    commit('SET_LINKS', res.data)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        /**
         *
         * @param store
         * @param payload
         * @returns {Promise<unknown>}
         */
        createLink(store, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/api/short-links', payload).then(res => {
                    resolve(res)
                }).catch(err => reject(err))
            })
        }
    }
}
