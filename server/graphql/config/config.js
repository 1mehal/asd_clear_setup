const path = require('path')

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../database.sqlite')
  },
  test: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../database_test.sqlite')
  },
  production: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../database_production.sqlite')
  }
}
