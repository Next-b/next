const db = require('./db');
const users = require('./users');

db.sync()

module.exports = {
  db, users
}