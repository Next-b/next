const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('cart', {
  firstName: {
    type: Sequelize.STRING,
    validate: {
      allowNull: false,
      defaultValue: '',
    }
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
      allowNull: false,
      defaultValue: '',
    }
  }
})