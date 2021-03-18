import Vue from 'vue';
import Vuex from 'vuex';
import Store from 'store2';
import picker from './picker';
import createPersistedState from 'vuex-persistedstate';

const store = Store.namespace('filestack-debug');

Vue.use(Vuex);

export const Initialize = async () => {
  const state = {
    clientConfig: {
      apikey: '',
      cname: '',
      security: {
        policy: '',
        signature: '',
      },
    },
  };

  return new Vuex.Store({
    state,
    getters: {
      clientConfig: (st: any) => st.clientConfig,
    },
    plugins: [createPersistedState()],
    mutations: {
      setClientConfig: (st: any, config: any) => {
        store.set('clientConfig', config);
        st.clientConfig = config;
      },
    },
    actions: {},
    modules: {
      picker,
    }
  });  
};
