const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const axios = require('axios')
const { ApolloServer, gql } = require('apollo-server-express')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')

const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const models = require('./graphql/models/')
// const validateTokensMiddleware = require('./auth/validate-tokens-middleware')
const {
  validateTokenAndSetCurrentUsernameMiddlware
} = require('./auth-token-processing')

config.dev = process.env.NODE_ENV !== 'production'

const app = express()
app.use(validateTokenAndSetCurrentUsernameMiddlware)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      req,
      models
    }
  }
})
server.applyMiddleware({ app })

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
