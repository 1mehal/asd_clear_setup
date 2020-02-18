const bcrypt = require('bcryptjs')
const { AuthenticationError } = require('apollo-server')
const axios = require('axios')
const { generateAuthorizationToken } = require('../auth-token-processing')

const checkUserAuthorization = function(req) {
  if (!req.currentAuthorizedUserName) {
    throw new AuthenticationError(
      `Authentication failed (${req.currentAuthorizationError})`
    )
  }
}

const resolvers = {
  Query: {
    async currentUserRemoteGreeting(root, nul, { req, models }) {
      checkUserAuthorization(req)
      const urlToCall = `${process.env.REMOTE_GREETING_SERVER_URL ||
        'http://127.0.0.1:8000/'}/hello?token=${
        req.headers.authorization.split('Bearer ')[1]
      }`
      const response = (await axios.get(urlToCall)).data

      return {
        message: response
      }
    },
    currentUser(root, {}, { req, models }) {
      checkUserAuthorization(req)
      return models.User.findOne({
        where: {
          username: req.currentAuthorizedUserName
        }
      })
    }
  },
  Mutation: {
    async createUser(root, { username, password }, { req, models }) {
      return models.User.create({
        username: username.toLowerCase(),
        password: await bcrypt.hash(password, 10)
      })
    },
    async login(root, { username, password }, { req, models }) {
      const user = await models.User.findOne({
        where: {
          username: username.toLowerCase()
        }
      })
      let passwordValid = false
      if (user) {
        passwordValid = await bcrypt.compare(password, user.password)
      }
      if (!user || !passwordValid) {
        throw new AuthenticationError('Authentication failed')
      }

      return generateAuthorizationToken(user)
    }
  }
}

module.exports = resolvers
