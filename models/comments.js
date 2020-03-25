const connection = require('../db/connection')

exports.addNewComment = (article_id, author, body) => {
    if (!author) return Promise.reject({ status: 400, msg: 'Bad request: missing username' })
    return connection('comments').insert({
        article_id,
        author,
        body
    }).returning('*')
}

exports.selectCommentsByArticle = (article_id) => {
    return connection('comments').select([
        'comment_id',
        'author',
        'votes',
        'created_at',
        'body'
    ])
        .where({ article_id })
        .orderBy('created_at')
}