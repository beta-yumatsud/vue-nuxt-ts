export default {
  state: {
    updated: (new Date()).toTimeString(),
  },
  mutations: {
    setUpdated(state) {
      state.updated = (new Date()).toTimeString();
    },
  },
  getters: {
    localUpdated(state) {
      state.updated = (new Date()).toLocaleTimeString();
    },
  },
};
