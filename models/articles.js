const connection = require('../db/connection')

exports.selectArticleById = (article_id) => {
    const article = connection('articles').select('*').where('article_id', article_id);
    const comments = connection('comments').select('*').where('article_id', article_id);

    return Promise.all([article, comments]).then(result => {
        if (!result[0].length) return Promise.reject({ status: 404, msg: 'article doesn\'t exist' })
        else {
            const comment_count = result[1].length
            const [[article]] = result
            return { ...article, comment_count }
        }
    })
}

exports.updateArticleVoteCount = (article_id, inc_votes) => {
    if (!inc_votes) return Promise.reject({ status: 400, msg: 'Bad request: must use {inc_votes: NUM}' })
    return connection('articles')
        .where('article_id', article_id)
        .increment('votes', inc_votes)
        .returning('*')
}