const Sequelize = require('sequelize')
const db = require('../db')

const Queue = db.define('queue', {
  songTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    allowEmpty: false
  },
  songArtist: {
    type: Sequelize.STRING,
    allowNull: false,
    allowEmpty: false
  },
  
}) 