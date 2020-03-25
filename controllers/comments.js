const { addNewComment, selectCommentsByArticle } = require('../models/comments')

exports.postNewComment = (req, res, next) => {
    if (Object.keys(req.body).length > 2) res.status(400).send({ msg: 'Bad request: request can only contain {username, body}' })
    else {
        const { article_id } = req.params
        const { username, body } = req.body
        addNewComment(article_id, username, body)
            .then(([comment]) => res.status(201).send({ comment }))
            .catch(next)
    }
}

exports.getCommentsByArticle = (req, res, next) => {
    const { query } = req
    const { article_id } = req.params
    selectCommentsByArticle(article_id, query)
        .then(comments => res.status(200).send({ comments }))
        .catch(next)
}