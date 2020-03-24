const connection = require('../db/connection')

exports.selectUserByUsername = (username) => {
    return connection('users').select('*').where('username', username)
        .then(user => {
            if (!user.length) return Promise.reject({ status: 404, msg: `username ${username} not found` })
            else return user
        })
}