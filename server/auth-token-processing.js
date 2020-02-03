require('dotenv').config()
const { sign, verify } = require('jsonwebtoken')
const secret =
  'kaoyjoAbPAlZdvXtenphsQnOd-rni5w3cvb3u_bWfvBoAMZLBeYs006gt5BPdQXZKBTiDQXwSIGeJSMEnaocPgpe9eSYOnDGR1cScC48E0Z-bpt6D9CbHRvf1rv4E9Z_d2lYlix3Yomaq198ap_dsICoqEffNH9aWl3sB_GLmS7yU7RehlTp1qye3Z-Y5FMnvlAUp0DqxcMDGoUAWYV_h-Rl_N8ZbB7YoH2MQ8N6N9S6rSUs6qnTqulmO7nT-Tbfg9-7FgZhahDuweEltC24lvkpTDEa5fQlmza4EqtCdi6tX39SNIOnj668w9_1fTJDJtsMx3OWzteine1yQc_KVQ'

// JWT_SECRET

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
