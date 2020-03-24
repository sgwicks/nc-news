const connection = require('../db/connection')

exports.selectUserByUsername = (username) => {
    return connection('users').select('*').where('username', username)
}