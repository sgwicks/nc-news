const { selectArticleById, updateArticleVoteCount } = require('../models/articles')

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    selectArticleById(article_id)
        .then((article) => {
            res.status(200).send({ article })
        }).catch(next)
}

exports.patchArticleVoteCount = (req, res, next) => {
    const { article_id } = req.params
    const { inc_votes } = req.body
    updateArticleVoteCount(article_id, inc_votes)
        .then(([article]) => res.status(201).send({ article }))
        .catch(next)
}