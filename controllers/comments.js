const { addNewComment } = require('../models/comments')

exports.postNewComment = (req, res, next) => {
    const { article_id } = req.params
    const { username, body } = req.body
    addNewComment(article_id, username, body)
        .then(([comment]) => res.status(201).send({ comment }))
        .catch(next)
}