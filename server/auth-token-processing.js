const { sign, verify } = require('jsonwebtoken')
const secret = 'qwertyuiopasdfghjklzxcvbnm123456'

function generateAuthorizationToken(user) {
  const token = sign(
    {
      username: user.username.toString()
    },
    secret,
    {
      expiresIn: '30m'
    }
  )
  return {
    token
  }
}

function validateTokenAndSetCurrentUsernameMiddlware(req, res, next) {
  const accessToken = req.headers.authorization
  if (!accessToken) return next()

  verify(accessToken.split('Bearer ')[1], secret, (err, decoded) => {
    if (decoded) {
      req.currentAuthorizedUserName = decoded.username
    } else {
      req.currentAuthorizationError = err
    }
  })
  return next()
}

module.exports = {
  generateAuthorizationToken,
  validateTokenAndSetCurrentUsernameMiddlware
}
