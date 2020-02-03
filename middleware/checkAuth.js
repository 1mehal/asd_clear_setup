import currentUser from '~/gql/currentUser'

const authLoginPath = '/auth/login'

const redirectToLoginIfAuthRequired = function(route, redirect) {
  const authRequired = []
    .concat(
      ...route.matched.map((r) => {
        return r.components.default.options.auth_required
      })
    )
    .some((x) => x === true)

  if (route.path !== authLoginPath && authRequired) {
    redirect(authLoginPath)
  }
}

export default function({ app, store, redirect, route }) {
  const hasToken = !!app.$apolloHelpers.getToken()

  if (!hasToken) {
    redirectToLoginIfAuthRequired(route, redirect)
  } else {
    app.apolloProvider.defaultClient
      .query({
        query: currentUser
      })
      .then(({ data }) => {
        store.commit('CURRENT_USER', data.currentUser)
      })
      .catch(() => {
        redirectToLoginIfAuthRequired(route, redirect)
      })
  }
}
