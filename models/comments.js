const connection = require('../db/connection')

exports.addNewComment = (article_id, author, body) => {
    if (!author) return Promise.reject({ status: 400, msg: 'Bad request: missing username' })
    return connection('comments').insert({
        article_id,
        author,
        body
    }).returning('*')
}

exports.selectCommentsByArticle = (article_id, { sort_by, order = 'desc' }) => {
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

exports.updateCommentVotes = (comment_id, votes) => {
    if (!votes) return Promise.reject({ status: 400, msg: 'Bad request: must use {inc_votes:NUM}' })
    return connection('comments')
        .where({ comment_id })
        .increment({ votes })
        .returning('*')
        .then(comment => {
            if (!comment.length) return Promise.reject({ status: 404, msg: 'Comment doesn\'t exist' })
            else return comment
        })
}

exports.removeCommentbyID = (comment_id) => {
    return connection('comments').where({ comment_id }).del()
}