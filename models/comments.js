const connection = require('../db/connection')

exports.addNewComment = (article_id, author, body) => {
    if (!author) return Promise.reject({ status: 400, msg: 'Bad request: missing username' })
    return connection('comments').insert({
        article_id,
        author,
        body
    }).returning('*')
}

exports.selectCommentsByArticle = (article_id, { sort_by, order = 'asc' }) => {
    return connection('comments').select([
        'comment_id',
        'author',
        'votes',
        'created_at',
        'body'
    ])
        .where({ article_id })
        .modify((query) => {
            if (sort_by) query.orderBy(sort_by, order)
            else query.orderBy('created_at', order)
        })
}