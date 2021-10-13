export const state = () => ({
  alert: {}
});

export const mutations = {
  setAlert(state, alert) {
    state.alert = alert;
  }
};
