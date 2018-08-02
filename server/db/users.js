const Sequelize = require('sequelize');
const db = require('./db')

const Users = db.define('users', {
  display_name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
    },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  external_urls: {
    type: Sequelize.TEXT,
  },
  spotifyId: {
    type: Sequelize.BIGINT
  },
  image: {
    type: Sequelize.TEXT
  },
  href: {
    type: Sequelize.TEXT
  },
  uri: {
    type: Sequelize.TEXT
  }
})

module.exports = Users