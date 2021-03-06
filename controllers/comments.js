const { addNewComment, selectCommentsByArticle, updateCommentVotes, removeCommentbyID } = require('../models/comments')
const {checkArticleExists} = require('../models/articles')

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
    
    Promise.all([selectCommentsByArticle(article_id, query), checkArticleExists(article_id)])
        .then(([comments]) => res.status(200).send({ comments }))
        .catch(next)
}

exports.patchCommentVotes = (req, res, next) => {
    if (Object.keys(req.body).length > 1) res.status(400).send({ msg: 'Bad request: must only use {inc_votes:NUM}' })
    else {
        const { comment_id } = req.params
        const { inc_votes } = req.body
        updateCommentVotes(comment_id, inc_votes)
            .then(([comment]) => res.status(200).send({ comment }))
            .catch(next)
    }
}

exports.deleteCommentbyId = (req, res, next) => {
    const { comment_id } = req.params
    removeCommentbyID(comment_id)
        .then(() => res.sendStatus(204))
        .catch(next)
}