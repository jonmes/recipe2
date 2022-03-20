import * as types from "./mutation-types";

const state = () => {
  return {
    user: null,
    auth: {
      client: null,
      isLoading: false,
      isAuthenticated: false,
    },
  };
};

// getters
const getters = {
  user: (state) => state.user,
  authClient: (state) => state.auth.client,
  isAuthenticated: (state) => !!state.user,
  isLoading: (state) => state.auth.isLoading,
};

// actions
const actions = {
  setUser({ commit }, user) {
    commit(types.SET_USER, { user });
  },
  setAuthLoadingStatus({ commit }, isLoading) {
    // console.log(isLoading, 'showing user auth loading')
    commit(types.SET_AUTH_LOADING_SATUS, { isLoading });
  },
  setUserAuthenticated({ commit }, isAuthenticated) {
    // console.log(isAuthenticated, 'showing user authentication')
    commit(types.SET_AUTH_AUTHENTICATED, { isAuthenticated });
  },
  setAuthClient({ commit }, client) {
    // console.log(client, "this is client")
    commit(types.SET_AUTH_CLIENT, { client });
  },
};

// mutations
const mutations = {
  [types.SET_USER](state, { user }) {
    state.user = user;
    console.log(user, 'loggin user')
  },
  [types.SET_AUTH_LOADING_SATUS](state, { status }) {
    state.auth.isLoading = status;
    // console.log(status, 'loadign status');
  },
  [types.SET_AUTH_AUTHENTICATED](state, { status }) {
    state.auth.isAuthenticated = status;
    // console.log(status, 'is authenticated status');
  },
  [types.SET_AUTH_CLIENT](state, { client }) {
    state.auth.client = client;
    // console.log(client,'client status');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
