const { selectArticleById, updateArticleVoteCount, selectAllArticles, checkTopicExists } = require('../models/articles')

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    selectArticleById(article_id)
        .then((article) => res.status(200).send({ article }))
        .catch(next)
}

exports.patchArticleVoteCount = (req, res, next) => {
    if (Object.keys(req.body).length > 1) res.status(400).send({ msg: 'Bad request: only inc_votes is accepted' })
    else {
        const { article_id } = req.params
        const { inc_votes } = req.body
        updateArticleVoteCount(article_id, inc_votes)
            .then(([article]) => res.status(200).send({ article }))
            .catch(next)
    }
}

exports.getAllArticles = (req, res, next) => {
    const { query } = req
    const selectArticles = selectAllArticles(query)
    const checkTopic = checkTopicExists(query)
    Promise.all([selectArticles, checkTopic])
        .then(([articles]) => res.status(200).send({ articles }))
        .catch(next)
}