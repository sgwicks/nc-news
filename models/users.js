const connection = require('../db/connection')

exports.selectUserByUsername = (username) => {
    return connection('users').select('*').where('username', username)
        .then(user => {
            if (!user.length) return Promise.reject({ status: 404, msg: `username ${username} not found` })
            else return user
        })
}

exports.checkAuthorExists = ({author}) => {
    if (author) {
        return connection('users')
        .select('*')
        .where('username', author)
        .then(authors => {
            if (!authors.length) return Promise.reject({status: 404, msg: 'That author does not exist'})
        })
    }
    else return Promise.resolve()
}