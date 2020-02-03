export const state = () => {
  return {
    currentUser: null,
    currentUserRemoteGreeting: null
  }
}

export const mutations = {
  CURRENT_USER(state, currentUser) {
    state.currentUser = currentUser
  },
  CURRENT_USER_REMOTE_GREETING(state, message) {
    state.currentUserRemoteGreeting = message
  }
}

export const getters = {
  currentUser: (state) => {
    return state.currentUser
  },
  currentUserRemoteGreeting: (state) => {
    return state.currentUserRemoteGreeting
  }
}
