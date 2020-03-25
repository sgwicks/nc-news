const connection = require('../db/connection')

exports.addNewComment = (article_id, author, body) => {
    if (!author) return Promise.reject({ status: 400, msg: 'Bad request: missing username' })
    return connection('comments').insert({
        article_id,
        author,
        body
    }).returning('*')
}