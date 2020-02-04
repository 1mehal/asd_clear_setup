const { readFileSync } = require('fs')
const { sign, verify } = require('jsonwebtoken')

function generateAuthorizationToken(user) {
  require('dotenv').config()

  const privateKey = readFileSync('server/secret_keys/asdemo_jwt256.key')

  const token = sign(
    {
      username: user.username.toString()
    },
    privateKey,
    {
      expiresIn: '30m',
      algorithm: 'RS256'
    }
  )
  return {
    token
  }
}

function validateTokenAndSetCurrentUsernameMiddlware(req, res, next) {
  const publicKey = readFileSync('server/secret_keys/asdemo_jwt256.key.pub')
  const accessToken = req.headers.authorization
  if (!accessToken) return next()

  verify(
    accessToken.split('Bearer ')[1],
    publicKey,
    {
      algorithms: ['RS256']
    },
    (err, decoded) => {
      if (decoded) {
        req.currentAuthorizedUserName = decoded.username
      } else {
        req.currentAuthorizationError = err
      }
    }
  )
  return next()
}

module.exports = {
  generateAuthorizationToken,
  validateTokenAndSetCurrentUsernameMiddlware
}
