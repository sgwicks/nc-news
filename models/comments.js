const connection = require('../db/connection')

exports.addNewComment = (article_id, author, body) => {
    return connection('comments').insert({
        article_id,
        author,
        body
    }).returning('*')
}